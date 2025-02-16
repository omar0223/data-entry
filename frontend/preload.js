const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    // for navigation
    navigate: (page) => ipcRenderer.send('navigate', page)
});

contextBridge.exposeInMainWorld('api', {

    fetchData: (endpoint) => ipcRenderer.invoke('fetch-data', endpoint),
});

