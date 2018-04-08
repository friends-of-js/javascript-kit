import chalk from 'chalk'
import * as fs from 'fs'
import { prompt } from 'inquirer'
import * as minimist from 'minimist'
import * as path from 'path'
import * as sao from 'sao'

function getTargetPath () {
  const { _: [directory] } = minimist(process.argv.slice(2))

  return directory || '.'
}

const questions = [
  {
    name: 'enforceDirectory',
    type: 'confirm',
    message: `Directory ${chalk.blue(path.resolve(getTargetPath()))} not empty, continue?`
  }
]

export async function generateFromTemplate () {
  return sao({
    template: path.resolve(__dirname, '../'),
    targetPath: getTargetPath()
  }).catch((error: Error) => {
    console.error(error)
    process.exit(2)
  })
}

export async function generate () {
  if (!fs.existsSync(path.resolve(getTargetPath())) || fs.readdirSync(path.resolve(getTargetPath())).length === 0) {
    return generateFromTemplate()
  }
  const { enforceDirectory } = await prompt<{ enforceDirectory: boolean }>(questions)
  if (!enforceDirectory) {
    console.error(chalk.red(`Directory "${path.resolve(getTargetPath())}" should be empty!`))
    process.exit(1)
  }

  return generateFromTemplate()
}
