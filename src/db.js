import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, './test-database.db')

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return
    }
})

export { db }
