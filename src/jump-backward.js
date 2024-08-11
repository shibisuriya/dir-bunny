import { STACK_TYPE } from './constants.js'
import { pop } from './pop.js'
import { push } from './push.js'
import { db } from './db.js'

async function jumpBackward(sessionId) {
    const poppedPath = await pop({ sessionId, stackType: STACK_TYPE.UNDO })
    push({ sessionId, path: poppedPath, stackType: STACK_TYPE.REDO })
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message)
        }
    })
}

export { jumpBackward }
