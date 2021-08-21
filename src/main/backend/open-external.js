const { ipcMain, shell } = require('electron')

ipcMain.on('open-external', (_event, url) => {
  shell.openExternal(url)
})
