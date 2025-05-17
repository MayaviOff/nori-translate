const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    translate: (args) => ipcRenderer.invoke('translate', args)
});