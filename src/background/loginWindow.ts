import path from 'path'
import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import * as SizeConst from '@/const/size'

export async function show() {
  const loginWin = new BrowserWindow({
    width: SizeConst.LoginWindowSize.width,
    height: SizeConst.LoginWindowSize.height,
    maximizable: false,
    backgroundColor: '#fff',
    center: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await loginWin.loadURL(path.join(process.env.WEBPACK_DEV_SERVER_URL + '/login'))
    
    if (!process.env.IS_TEST) loginWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    loginWin.loadURL('app://./index.html/login')
  }

  return loginWin;
}
