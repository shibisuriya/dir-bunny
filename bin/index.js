#!/usr/bin/env node

import { Command } from 'commander'
import { init } from '../src/init/index.js'
import { push } from '../src/push.js'
import { end } from '../src/end.js'
import { jumpForward } from '../src/jump-forward.js'
import { jumpBackward } from '../src/jump-backward.js'
import { changeDirectory } from '../src/change-directory.js'

const program = new Command()

program
    .name('dir-bunny')
    .description('CLI to manage paths and sessions')
    .version('0.0.1')

program
    .command('change-directory')
    .option(
        '-s, --session-id <session-id>',
        'The ID of the session to push changes to'
    )
    .option('-p, --path <path>', 'The path of the files or directory to push')
    .description('Push a path and session ID onto the stack')
    .action(async (options) => {
        const { sessionId, path } = options
        if (!sessionId) {
            console.error('Error: The --session-id option is mandatory.')
            process.exit(1)
        }

        if (!path) {
            console.error('Error: The --path option is mandatory.')
            process.exit(1)
        }
        await changeDirectory({ sessionId, path })
    })

program
    .command('end <session-id>')
    .description('End the current session')
    .action((sessionId) => {
        end(sessionId)
    })

program
    .command('init <shell>')
    .description('Init the cli tool')
    .action((shell) => {
        init(shell)
    })

program
    .command('jump-backward <session-id>')
    .description('To back to the directory where you came from...')
    .action((sessionId) => {
        jumpBackward(sessionId)
    })

program
    .command('jump-forward <session-id>')
    .description('To forward to the directory where you came from...')
    .action((sessionId) => {
        jumpForward(sessionId)
    })

program.parse(process.argv)
