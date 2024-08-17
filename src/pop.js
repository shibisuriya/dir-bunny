import { db } from './db.js'
import { getTableName } from './helpers.js'

async function pop({ sessionId, stackType }) {
    const tableName = getTableName({ stackType, sessionId })

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // console.log('Popping from, ', tableName)
            db.get(
                `
                    SELECT id, path
                    FROM ${tableName}
                    ORDER BY id DESC
                    LIMIT 1
                `,
                (err, row) => {
                    if (err) {
                        reject(err)
                    }

                    if (row) {
                        db.run('BEGIN TRANSACTION', (err) => {
                            if (err) {
                                reject(err)
                            }
                            const { id } = row
                            db.run(
                                `DELETE FROM ${tableName} WHERE id = ?`,
                                [id],
                                function (err) {
                                    if (err) {
                                        db.run('ROLLBACK', (rollbackErr) => {
                                            if (rollbackErr) {
                                                reject(rollbackErr)
                                            }
                                            reject(err)
                                        })
                                    }

                                    db.run('COMMIT', (commitErr) => {
                                        if (commitErr) {
                                            db.run(
                                                'ROLLBACK',
                                                (rollbackErr) => {
                                                    if (rollbackErr) {
                                                        reject(rollbackErr)
                                                    }
                                                    reject(commitErr)
                                                }
                                            )
                                        }
                                        resolve(row.path)
                                    })
                                }
                            )
                        })
                    } else {
                        resolve()
                    }
                }
            )
        })
    })
}

export { pop }
