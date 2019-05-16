/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Set environment for development
process.env.NODE_ENV = 'development'

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

require('electron').app.on('ready', () => {
  
  let installExtension = require('electron-devtools-installer')

  // Install `vue-devtools`
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {console.log('Installed `vue-devtools`')})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    });
  
  // install `three.js inspector`
  installExtension.default('dnhjfclbfhcbcdfpjaeacomhbdfjbebi')
    .then(() => {console.log('Installed `three.js inspector`')})
    .catch(err => {
      console.log('Unable to install `three.js inspector`: \n', err)
    });
  
})

// Require `main` process to boot app
require('./index')
