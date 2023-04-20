import { ipcRenderer } from 'electron'

export default {
    async startSearchEngine (data: { keywords: string }) {
        await ipcRenderer.invoke('tools/search-engine', data)
    }
}
