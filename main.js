const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { generateJobEntry } = require('./src/jobGenerator');
require('dotenv').config();

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 800,
        minWidth: 600,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#f4f4f4',
        show: false,
        titleBarStyle: 'hiddenInset',
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.loadFile('index.html');

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('generate-feed', (event, numJobs, submitterId, companyUid, screeningConfig) => {
    const jobs = [];
    for (let i = 0; i < numJobs; i++) {
        const job = generateJobEntry(i + 1, submitterId, companyUid, screeningConfig);
        jobs.push(job);
    }
    const filePath = path.join(__dirname, 'jobFeed.json');
    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
    return `Generated ${numJobs} job entries and saved to jobFeed.json`;
});

ipcMain.handle('get-github-token', () => {
    const token = process.env.GITHUB_TOKEN;
    console.log('GitHub Token from main process:', token);
    if (!token) {
        throw new Error('GitHub token not found. Please check your environment configuration.');
    }
    return token;
});
