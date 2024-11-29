const { ipcRenderer } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Load locations data
const locationsPath = path.join(__dirname, 'data/locations/locations.json');
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

let GITHUB_TOKEN = null;
let GITHUB_USERNAME = null;

// Modified token initialization to also fetch username
ipcRenderer.invoke('get-github-token').then(async token => {
    GITHUB_TOKEN = token;
    try {
        // Fetch user information using the token
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });
        GITHUB_USERNAME = response.data.login;
        console.log('GitHub Username:', GITHUB_USERNAME);
    } catch (err) {
        console.error('Failed to get GitHub username:', err);
    }
}).catch(err => {
    console.error('Failed to get GitHub token:', err);
});

document.addEventListener('DOMContentLoaded', () => {
    const enableScreening = document.getElementById('enableScreening');
    const screeningOptions = document.getElementById('screeningOptions');
    
    if (enableScreening && screeningOptions) {
        enableScreening.addEventListener('change', (e) => {
            if (e.target.checked) {
                screeningOptions.style.display = 'block';
                // Use setTimeout to trigger animation after display is set
                setTimeout(() => {
                    screeningOptions.classList.add('show');
                }, 10);
            } else {
                screeningOptions.classList.remove('show');
                // Wait for animation to complete before hiding
                setTimeout(() => {
                    screeningOptions.style.display = 'none';
                }, 300);
                
                // Uncheck all sub-options
                const checkboxes = screeningOptions.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => checkbox.checked = false);
            }
        });
    }

    // Add loading indicator during generation
    document.getElementById('feed-form').addEventListener('submit', async (event) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<div class="loading">Generating feed...</div>';
        // ... rest of your submit handler
    });
});

document.getElementById('feed-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
        console.error('GitHub token or username not found');
        document.getElementById('result').innerHTML = `
            <p>Error: GitHub authentication information not found</p>
        `;
        return;
    }

    const numJobs = document.getElementById('numJobs').value;
    const submitterId = document.getElementById('submitterId').value;
    const companyUid = document.getElementById('companyUid').value;

    // Get screening configuration
    const screeningConfig = {
        enableScreening: document.getElementById('enableScreening')?.checked || false,
        technicalEducation: document.getElementById('technicalEducation')?.checked || false,
        experienceQuestion: document.getElementById('experienceQuestion')?.checked || false,
        conveyorExperience: document.getElementById('conveyorExperience')?.checked || false,
        qualifications: document.getElementById('qualifications')?.checked || false,
        workPermit: document.getElementById('workPermit')?.checked || false
    };

    const result = await ipcRenderer.invoke('generate-feed', numJobs, submitterId, companyUid, screeningConfig);
    const filePath = path.join(__dirname, 'jobFeed.json');

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        const response = await axios.post(
            'https://api.github.com/gists',
            {
                files: {
                    'jobFeed.json': {
                        content: content
                    }
                },
                public: true,
                description: 'Generated job feed'
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            }
        );

        const gistId = response.data.id;
        const rawUrl = `https://gist.githubusercontent.com/${GITHUB_USERNAME}/${gistId}/raw/jobFeed.json`;
        
        document.getElementById('result').innerHTML = `
            <div>
                Local file: <a href="file://${filePath}" target="_blank">${filePath}</a>
                <br>
                Gist URL: <a href="${rawUrl}" target="_blank">${rawUrl}</a>
                <button class="copy-btn" onclick="copyToClipboard('${rawUrl}')">Copy Link</button>
            </div>
        `;
    } catch (error) {
        console.error('Error creating Gist:', error);
        document.getElementById('result').innerHTML = `
            <p style="color: #dc3545;">Error creating Gist. Please check the console for details.</p>
        `;
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            const btn = document.querySelector('.copy-btn');
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy Link';
            }, 2000);
        })
        .catch(err => console.error('Failed to copy:', err));
}