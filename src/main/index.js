import { app, BrowserWindow } from 'electron'


// Make it run on dev machines it shouldn't be able to run on.
if (process.env.NODE_ENV === 'development') {
  app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true')
  app.commandLine.appendSwitch('enable-gpu-rasterization', 'true')
  app.commandLine.appendSwitch('enable-zero-copy', 'true')
  app.commandLine.appendSwitch('disable-software-rasterizer', 'true')
  app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', 'true')
}

var log = require('electron-log');
var fs = require('fs');

//TODO Get logger writing to file.

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,

    webgl: true,
    experimentalFeatures: true,
    experimentalCanvasFeatures: true,
    offscreen: true
  })

  mainWindow.setMenu(null)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
