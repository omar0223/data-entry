const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile('renderer/index.html');
}

// Handle API calls from renderer process
ipcMain.handle('fetch-data', async (event, endpoint) => {
    try {
        const response = await axios.get(`https://api.semis.li/data-entry/api/v1/${endpoint}`);
        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch data' };
    }
});

app.whenReady().then(createWindow);
