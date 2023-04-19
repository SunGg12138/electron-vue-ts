import { contextBridge } from 'electron'
import loginPreload from './preload/login'

const api = {
  ...loginPreload,
}

// 暴露到window全局
contextBridge.exposeInMainWorld('api', api)

export default api
