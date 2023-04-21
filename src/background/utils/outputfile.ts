import path from 'path'
import fs from 'fs-extra'
import { app } from 'electron'
import { randomStr } from './randomStr'
import * as db from '@/background/db'

const cachePath = app.getPath('userData')

class Outputfile {
    readonly filepath: string;

    constructor (type: string) {
        const random = `${randomStr(10)}-${Date.now()}`
        this.filepath = path.join(cachePath, `/outputfile/${random}`)
        fs.ensureFileSync(this.filepath)
        db.outputfile.insertOne({
            type,
            filepath: this.filepath,
            created: new Date(),
        })
    }

    append (data: string | Buffer) {
        return fs.appendFile(this.filepath, data)
    }

    write (data: string | Buffer) {
        return fs.writeFile(this.filepath, data)
    }

    read () {
        return fs.readFile(this.filepath)
    }
}

export default Outputfile

export function outputfile (type: string) {
    return new Outputfile(type)
}
