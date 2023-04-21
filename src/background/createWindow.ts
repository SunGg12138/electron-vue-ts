import path from 'path'
import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import './ipcMain'
import * as CONST from '@/const'
import * as db from './db';
import * as loginWindow from './loginWindow'
import { ipcMain } from 'electron'

export default async function createWindow () {
  const user = await db.user.findOne({ status: 1 });

  // Create the browser window.
  global.mainWin = new BrowserWindow({
    width: CONST.HomeWindowSize.width,
    height: CONST.HomeWindowSize.height,
    title: CONST.Title,
    backgroundColor: '#fff',
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  })
  
  // 未登录展示登录页面
  if (!user) {
    mainWin.hide()
    const loginWin = await loginWindow.show()
    ipcMain.once('login/success', function () {
      loginWin.close()
      mainWin.show()
    })
  }
  
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    
    if (!process.env.IS_TEST) mainWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWin.loadURL('app://./index.html')
  }
}
