import { ipcMain } from 'electron'
import * as db from '../db';

ipcMain.handle('login', async function (_event, args) {
  await db.user.insertOne({ ...args, status: 1, createdAt: new Date() })
  return {
    success: true,
  }
});

