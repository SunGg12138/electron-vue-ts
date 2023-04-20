import { app } from 'electron'
import Datastore from 'nedb-promises'

const cachePath = app.getPath('userData')

export const user = Datastore.create({ filename: `${cachePath}/db/user.db`, autoload: true });
export const log = Datastore.create({ filename: `${cachePath}/db/log.db`, autoload: true });
export const outputfile = Datastore.create({ filename: `${cachePath}/db/outputfile.db`, autoload: true });
