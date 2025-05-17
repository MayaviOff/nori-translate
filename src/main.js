const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const translate = require("@vitalets/google-translate-api");


app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    } 
  });

  win.loadFile(path.join(__dirname, 'ui/index.html'));
  win.webContents.openDevTools();
}


app.whenReady().then(createWindow());


ipcMain.handle('translate', async(_, {text, from, to}) => {
    try {
        const res = await translate(text, {from, to});
        return res.text;
    } catch (err) {
        return '[mistake of translation]'
    }
})


app.on('window-all-closed', () => {
  app.quit();
});
