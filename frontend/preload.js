const { contextBridge, ipcRenderer } = require('electron');



contextBridge.exposeInMainWorld('electron', {
    // for navigation
    // navigate: (page) => ipcRenderer.send('navigate', page),
    navigate: (page, params = null) => ipcRenderer.send("navigate", { page, params }),

    //bar chat
    // sendParams: (params) => ipcRenderer.send("navigate", params),
    onReceiveParams: (callback) => ipcRenderer.on("display-params", callback)
    
});

contextBridge.exposeInMainWorld('api', {

    fetchData: (endpoint) => ipcRenderer.invoke('fetch-data', endpoint),
});

