import { BrowserWindow } from 'electron'
import preload from '../preload'
import outputfile from '@/background/utils/outputfile'

declare global {
  interface Window {
    api: typeof preload
  }
  namespace NodeJS {
    interface Global {
      mainWin: BrowserWindow
    }
  }
  var mainWin: BrowserWindow
  var Outputfile: outputfile
  var DownloadOutputfile: {
    title?: string
    outputfilePath: string
    ext: string
    filters?: any[]
  }
}
