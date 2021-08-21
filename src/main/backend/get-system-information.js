const { ipcMain } = require('electron')

ipcMain.on('get-system-information', (event, element) => {
  let data
  switch (element) {
  case 'chrome':
    data = process.versions.chrome
    break
  case 'electron':
    data = process.versions.electron
    break
  case 'node':
    data = process.versions.node
    break
  case 'platform':
    data = require('os').platform()
    break
  case 'vue':
    data = require('vue/package.json').version
    break
  case 'nuxt':
    data = require('nuxt/package.json').version
    break
  default:
    return
  }
  event.reply('get-system-information', element, data)
})
