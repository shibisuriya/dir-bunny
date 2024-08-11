import { STACK_TYPE } from './constants.js'
import { db } from './db.js'
import { getTableName } from './helpers.js'

async function push({ sessionId, path, stackType = STACK_TYPE.UNDO }) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            const tableName = getTableName({ stackType, sessionId })
            // Create a table in the db for each shell instance, so
            // that we can simply drop the table if a shell instance is
            // killed.
            db.run(
                `CREATE TABLE IF NOT EXISTS ${tableName} (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             path TEXT NOT NULL
             )`,
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        const stmt = db.prepare(
                            `INSERT INTO ${tableName} (path) VALUES (?)`
                        )
                        stmt.run(path, (err) => {
                            if (err) {
                                reject(err)
                            } else {
                                // Retrieve and print the contents of the table
                                db.all(
                                    `SELECT * FROM ${tableName};`,
                                    (err, rows) => {
                                        if (err) {
                                            console.error(
                                                `Error retrieving data from ${tableName}:`,
                                                err.message
                                            )
                                        } else {
                                            console.log(
                                                `Contents of table ${tableName}:`
                                            )
                                            console.log(rows)
                                        }

                                        // Finalize the statement and close the database
                                        stmt.finalize(() => {
                                            resolve()
                                        })
                                    }
                                )
                                resolve()
                            }
                        })
                    }
                }
            )
        })
    })
}

export { push }
