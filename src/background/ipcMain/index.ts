import './login'
import './tools'
import fs from 'fs-extra'
import { app, ipcMain, dialog } from 'electron'
import logger from '@/background/lib/logger'

const downloadsPath = app.getPath('downloads')

// 下载outputfile
ipcMain.handle('outputfile/download', async function (_event, args: typeof DownloadOutputfile) {
  logger.info('handle outputfile/download', args)

  const filename = 'outputfile-' + Date.now()
  const defaultPath = `${downloadsPath}/${filename}`
  
  const result = await dialog.showSaveDialog({
    title: args.title || '保存文件到...',
    defaultPath,
    buttonLabel: '保存',
    filters: args.filters || [],
  })

  if (!result.canceled) {
    await fs.move(args.outputfilePath, `${result.filePath || defaultPath}.${args.ext}`)
  }
});
