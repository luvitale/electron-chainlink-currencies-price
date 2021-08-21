import BrowserWinHandler from './BrowserWinHandler'

// Render < - > Main Process Communication
// Handlers
// https://github.com/michalzaq12/electron-nuxt/issues/129#issuecomment-536178898
import './backend'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
