import * as db from '../db'
const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
    info (msg: string, data?: Record<string, any>) {
        if (isDevelopment) {
            console.log({ msg, level: 'info', data, createdAt: new Date() })
        }
        db.log.insertOne({ msg, level: 'info', data, createdAt: new Date() }) 
    },
    error (msg: string, err?: Error, data?: Record<string, any>) {
        if (isDevelopment) {
            console.log({ msg, level: 'info', data, createdAt: new Date() })
        }
        const errmsg = err? err.message : null
        const errstack = err? err.stack : null
        db.log.insertOne({ msg, errmsg, errstack, level: 'error', data, createdAt: new Date() }) 
    }
}
