import * as db from '../db'
const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
    info (msg: string, data?: Record<string, any>) {
        if (isDevelopment) {
            console.log({ msg, level: 'info', data, createdAt: new Date() })
        }
        return db.log.insertOne({ msg, level: 'info', data, createdAt: new Date() }) 
    },
    error (msg: string, err?: Error, data?: Record<string, any>) {
        if (isDevelopment) {
            console.log({ msg, level: 'info', data, createdAt: new Date() })
        }
        return db.log.insertOne({ msg, err: err?.message, errstack: err?.stack, level: 'error', data, createdAt: new Date() }) 
    }
}
