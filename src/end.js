import { main } from './test.js'

function end(sessionId) {
    console.log('ending ', sessionId)
    main().catch((err) => {
        console.error('Error:', err.message)
    })
}

export { end }
