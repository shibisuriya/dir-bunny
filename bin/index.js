#!/usr/bin/env node

import { Command } from 'commander'
import { init } from '../src/init/index.js'
import { push } from '../src/push.js'
import { pop } from '../src/pop.js'
import { end } from '../src/end.js'

const program = new Command()

program
    .name('dir-bunny')
    .description('CLI to manage paths and sessions')
    .version('0.0.1')

program
    .command('push')
    .option(
        '-s, --session-id <session-id>',
        'The ID of the session to push changes to'
    )
    .option('-p, --path <path>', 'The path of the files or directory to push')
    .description('Push a path and session ID onto the stack')
    .action((options) => {
        const { sessionId, path } = options
        if (!sessionId) {
            console.error('Error: The --session-id option is mandatory.')
            process.exit(1)
        }

        if (!path) {
            console.error('Error: The --path option is mandatory.')
            process.exit(1)
        }
        push(sessionId, path)
    })

program
    .command('pop <session-id>')
    .description('Pop a path and session ID from the stack')
    .action((sessionId) => {
        pop(sessionId)
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

program.parse(process.argv)
