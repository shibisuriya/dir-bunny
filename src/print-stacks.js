import { STACK_TYPE } from './constants.js'
import { getTableName } from './helpers.js'
import { db } from './db.js'

async function printStacks(sessionId) {
    const undoStackTableName = getTableName({
        stackType: STACK_TYPE.UNDO,
        sessionId,
    })
    const redoStackTableName = getTableName({
        stackType: STACK_TYPE.REDO,
        sessionId,
    })

    try {
        const undoStack = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${undoStackTableName};`, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        console.log('Undo stack: ')
        console.log(undoStack)
    } catch (err) {
        console.error('Error fetching undo stack:', err)
    }

    console.log('')

    try {
        const redoStack = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${redoStackTableName};`, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
        console.log('Redo stack: ')
        console.log(redoStack)
    } catch (err) {
        console.error('Error fetching redo stack:', err)
    }
}

export { printStacks }
