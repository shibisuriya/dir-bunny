import { STACK_TYPE } from './constants.js'
import { getTableName } from './helpers.js'
import { db } from './db.js'

async function clearStacks(sessionId) {
    const undoStackTableName = getTableName({
        stackType: STACK_TYPE.UNDO,
        sessionId,
    })
    const redoStackTableName = getTableName({
        stackType: STACK_TYPE.REDO,
        sessionId,
    })

    try {
        // Clear the undo stack table
        db.run(`DELETE FROM ${undoStackTableName}`)
        console.log(`Cleared table: ${undoStackTableName}`)
    } catch (err) {
        console.error('Error clearing undo stack:', err)
    }

    try {
        db.run(`DELETE FROM ${redoStackTableName}`)
        console.log(`Cleared table: ${redoStackTableName}`)
    } catch (err) {
        console.error('Error clearing redo stack:', err)
    }
}

export { clearStacks }
