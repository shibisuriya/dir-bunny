import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { SUPPORTED_SHELLS } from '../constants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getFileContent(filePath) {
    try {
        const fileContent = fs.readFileSync(
            resolve(__dirname, filePath),
            'utf8'
        )
        return fileContent
    } catch (err) {
        console.error('Error reading the file:', err)
    }
}

function init(shell) {
    if (!Object.values(SUPPORTED_SHELLS).includes(shell)) {
        throw new Error(
            `Unsupported shell, dir-bunny currently only supports the following shells, ${Object.values(SUPPORTED_SHELLS)}.`
        )
    }

    switch (shell) {
        case SUPPORTED_SHELLS.ZSH:
            console.log(getFileContent('./scripts/zsh.sh'))
    }
}

export { init }
