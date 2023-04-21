import { ipcMain } from 'electron'
import * as Services from '@/background/services/tools';
import logger from '@/background/lib/logger';

// 搜索引擎
ipcMain.handle('tools/search-engine', async function (_event, args) {
  logger.info('handle tools/search-engine', args)
  return Services.searchEngine(args);
});
