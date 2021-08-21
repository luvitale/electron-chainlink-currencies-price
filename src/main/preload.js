const { contextBridge, ipcRenderer } = require('electron')

// Whitelist channels
const validSendChannels = require('./channels/toSend')
const validReceiveChannels = require('./channels/toReceive')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    const validChannels = validSendChannels

    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    const validChannels = validReceiveChannels

    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (_event, ...args) => func(...args))
    }
  }
})

contextBridge.exposeInMainWorld('require', module => {
  const validModules = [
    'querystring' // Nuxt dependency
  ]
  if (validModules.includes(module)) {
    return require(module)
  }
})
