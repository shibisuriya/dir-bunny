import { pop } from './pop.js'
import { push } from './push.js'
import { STACK_TYPE } from './constants.js'
import { db } from './db.js'

async function jumpForward(sessionId) {
    const poppedPath = await pop({ sessionId, stackType: STACK_TYPE.REDO })
    push({ sessionId, path: poppedPath, stackType: STACK_TYPE.UNDO })
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message)
        }
    })
}

export { jumpForward }
