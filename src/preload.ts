import { contextBridge } from 'electron'
import loginPreload from './preload/login'
import { ipcRenderer } from 'electron'

const api = {
  ...loginPreload,

  send (channel: string, args?: any) {
    ipcRenderer.send(channel, args)
  },

  invoke (channel: string, args?: any) {
    return ipcRenderer.invoke(channel, args)
  },

  on (channel: string, cb: (args: any) => void) {
    ipcRenderer.on(channel, function (_event, args) {
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
