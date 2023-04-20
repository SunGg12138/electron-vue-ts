import preload from '../preload'
import outputfile from '@/background/utils/outputfile'

declare global {
  interface Window {
    api: typeof preload
  }
  const Outputfile: outputfile
}
