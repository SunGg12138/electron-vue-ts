import { contextBridge } from 'electron'
import loginPreload from './preload/login'
import { ipcRenderer } from 'electron'

const api = {
  ...loginPreload,

  send (channel: string, args?: any) {
    ipcRenderer.send(channel, args)
  }
}

// 暴露到window全局
contextBridge.exposeInMainWorld('api', api)

export default api
