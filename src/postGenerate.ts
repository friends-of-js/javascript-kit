import chalk from 'chalk'
import { exec, spawnSync } from 'child_process'

export async function runCommand (command: string, cwd: string) {
  return new Promise<string>((resolve, reject) => {
    exec(command, { cwd }, (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

export function installDependencies ({ answers: { pm }, folderPath }: any) {
  console.log(`> ${pm} install`)
  spawnSync(pm, ['install'], { cwd: folderPath, stdio: 'inherit' })
}

export function createSymlink ({ answers: { pm }, folderPath }: any) {
  console.log(chalk.cyan('\n> Creating symlink to package...'))
  void runCommand(`${pm} run createLink`, folderPath)
}

function repositoryUrlToGitSSH (repository: string) {
  const [, domain, username, pkg] = repository.match(/(?:https?:\/\/)([\w\d.]+)\/([-_\w\d]+)\/([-_\w\d]+)/) as string[]

  return `git@${domain}:${username}/${pkg}.git`
}

export function addGitRemote ({ answers: { repository }, folderPath }: any) {
  if (repository === undefined) return
  const gitSSH = repositoryUrlToGitSSH(repository)
  console.log(chalk.cyan(`\n> git remote add origin ${gitSSH}\n`))
  void runCommand(`git remote add origin ${gitSSH}`, folderPath)
}

// istanbul ignore next: can not mock dependencies
export async function postGenerate (context: any) {
  installDependencies(context)

  createSymlink(context)

  addGitRemote(context)
}
