import { pop } from './pop.js'
import { push } from './push.js'
import { STACK_TYPE } from './constants.js'
import { db } from './db.js'

async function jumpForward(sessionId) {
    try {
        const poppedPath = await pop({ sessionId, stackType: STACK_TYPE.REDO })
        if (poppedPath) {
            const cwd = process.cwd()
            await push({
                sessionId,
                path: cwd,
                stackType: STACK_TYPE.UNDO,
            })
        }
        db.close((err) => {
            if (err) {
                console.error('Error closing the database:', err.message)
            } else {
                if (poppedPath) {
                    console.log(poppedPath)
                }
            }
        })
    } catch (err) {}
}

export { jumpForward }
