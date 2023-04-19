import path from 'path'
import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import './ipc'
import * as SizeConst from '@/const/size'
import * as db from './nedb';

export default async function createWindow () {
    const user = await db.userdb.findOne({ status: 1 });

    let windowOptions;

    // 如果用户未登录，跳转到登录页
    if (user) {
      windowOptions = {
        width: SizeConst.HomeWindow.width,
        height: SizeConst.HomeWindow.height,
        backgroundColor: '#fff',
        center: true,
      }
    } else {
      windowOptions = {
        width: SizeConst.LoginWindow.width,
        height: SizeConst.LoginWindow.height,
        maximizable: false,
        backgroundColor: '#fff',
        center: true,
      }
    }

    // Create the browser window.
    const win = new BrowserWindow({
      titleBarStyle: user? 'default' : 'hidden',
      ...windowOptions,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(path.join(process.env.WEBPACK_DEV_SERVER_URL, user? '' : '/login'))
      
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      win.loadURL('app://./index.html' + (user? '' : '/login'))
    }
}
