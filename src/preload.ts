import { contextBridge } from 'electron'
import loginPreload from './preload/login'
import toolsPreload from './preload/tools'
import { ipcRenderer } from 'electron'

const api = {
  ...loginPreload,
  ...toolsPreload,

  send (channel: string, args?: any) {
    ipcRenderer.send(channel, args)
  },

  on (channel: string, cb: (args: any) => void) {
    ipcRenderer.on(channel, function (args) {
      cb(args)
    })
  },

  removeListener (channel: string, listener: (args: any) => void) {
    ipcRenderer.removeListener(channel, listener)
  }
}

// 暴露到window全局
contextBridge.exposeInMainWorld('api', api)

export default api
