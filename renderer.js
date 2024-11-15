const { ipcRenderer } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Load locations data
const locationsPath = path.join(__dirname, 'data/locations/locations.json');
const locationsData = JSON.parse(fs.readFileSync(locationsPath, 'utf8'));

let GITHUB_TOKEN = null;

// Request the GitHub token from the main process
ipcRenderer.invoke('get-github-token').then(token => {
    GITHUB_TOKEN = token;
    console.log('GitHub Token from renderer process:', GITHUB_TOKEN); // Log the token for debugging
}).catch(err => {
    console.error('Failed to get GitHub token:', err);
});

document.getElementById('feed-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!GITHUB_TOKEN) {
        console.error('GitHub token not found');
        document.getElementById('result').innerHTML = `
            <p>Error: GitHub token not found</p>
        `;
        return;
    }

    const numJobs = document.getElementById('numJobs').value;
    const submitterId = document.getElementById('submitterId').value;
    const companyUid = document.getElementById('companyUid').value;

    const result = await ipcRenderer.invoke('generate-feed', numJobs, submitterId, companyUid);
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
        const rawUrl = `https://gist.githubusercontent.com/OsmanEgretli/${gistId}/raw/jobFeed.json`;
        
        document.getElementById('result').innerHTML = `
            <div class="link-container">
                <p>Link created at:</p>
                <a href="${rawUrl}" target="_blank">${rawUrl}</a>
                <button class="copy-button" onclick="copyToClipboard('${rawUrl}')">Copy Link</button>
            </div>
        `;
    } catch (error) {
        console.error('Error creating Gist:', error);
        document.getElementById('result').innerHTML = `
            <p>Error creating Gist. Please check the console for details.</p>
        `;
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('Link copied to clipboard'))
        .catch(err => console.error('Failed to copy:', err));
}