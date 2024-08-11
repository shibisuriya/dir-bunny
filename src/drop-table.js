import { db } from './db.js'

function dropTable(tableName) {
    return new Promise((resolve, reject) => {
        db.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

export { dropTable }
