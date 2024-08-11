import { db } from './db.js'

function push(sessionId, path) {
    // Clear the redo stack if present!

    db.serialize(() => {
        const tableName = `undo_stack_${sessionId}`
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
                    console.error('Error creating table:', err.message)
                } else {
                    const stmt = db.prepare(
                        `INSERT INTO ${tableName} (path) VALUES (?)`
                    )
                    stmt.run(path, (err) => {
                        if (err) {
                            console.error('Error inserting data:', err.message)
                        } else {
                            console.log('Data inserted successfully.')

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
                                        db.close((err) => {
                                            if (err) {
                                                console.error(
                                                    'Error closing the database:',
                                                    err.message
                                                )
                                            }
                                        })
                                    })
                                }
                            )
                        }
                    })
                }
            }
        )
    })
}

export { push }
