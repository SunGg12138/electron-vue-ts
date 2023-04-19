import { ipcRenderer } from 'electron'

export default {
  async login (data: { loginName: string, password: string }): Promise<{ success: boolean }> {
    const res = await ipcRenderer.invoke('login', {
      data,
    })
    return res
  }
}
