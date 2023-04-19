import Datastore from 'nedb-promises'
import { app } from 'electron'

const cachePath = app.getPath('userData')

export const userdb = Datastore.create({ filename: `${cachePath}/db/user.db`, autoload: true });


