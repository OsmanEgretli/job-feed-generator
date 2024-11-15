const { ipcRenderer } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

document.getElementById('feed-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const numJobs = document.getElementById('numJobs').value;
    const submitterId = document.getElementById('submitterId').value;
    const companyUid = document.getElementById('companyUid').value;

    const result = await ipcRenderer.invoke('generate-feed', numJobs, submitterId, companyUid);
    const filePath = path.join(__dirname, 'jobFeed.json');

    try {
        const rawUrl = await createGist(filePath);
        console.log('Gist created at:', rawUrl);
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

async function createGist(filePath) {
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

    // Construct a stable URL manually
    const gistId = response.data.id;
    const rawUrl = `https://gist.githubusercontent.com/OsmanEgretli/${gistId}/raw/jobFeed.json`;

    return rawUrl;
}

function copyToClipboard(text) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    alert('Link copied to clipboard');
}