import { ipcMain } from 'electron'
import * as db from './nedb';

ipcMain.handle('login', async function (_event, args) {
  await db.userdb.insertOne({ ...args, status: 1, createdAt: new Date() })
  return {
    success: true,
  }
});

