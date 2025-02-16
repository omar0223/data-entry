const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            contextIsolation: true,  // Important for security
            enableRemoteModule: false, // Ensure proper Electron security
            // nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'renderer/login.html'));
    // mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

    ipcMain.on('navigate', (event, dataPar) => {

        fs.readFile(path.join(__dirname, 'renderer', `${dataPar.page}.html`), 'utf-8', (err, data) => {
            if (!err) {
                // console.log('Open page');
                mainWindow.webContents.executeJavaScript(`document.getElementById(\"page-content\").innerHTML = \`${data}\`;`);
                mainWindow.webContents.send("display-params", dataPar.params);
            }
        });
    });
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
