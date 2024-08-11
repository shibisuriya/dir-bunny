import { STACK_TYPE } from './constants.js'
import { push } from './push.js'
import { dropTable } from './drop-table.js'
import { getTableName } from './helpers.js'
import { db } from './db.js'

async function changeDirectory({ sessionId, path }) {
    await push({
        sessionId,
        path,
        stackType: STACK_TYPE.UNDO,
    })
    const tableName = getTableName({ sessionId, stackType: STACK_TYPE.REDO })
    await dropTable(tableName)
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message)
        }
    })
}

export { changeDirectory }
