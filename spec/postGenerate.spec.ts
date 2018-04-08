import * as pkg from '@friends-of-js/javascript-kit'
import { expect, use as applyChaiPlugin } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as childProcess from 'child_process'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

applyChaiPlugin(chaiAsPromised)
applyChaiPlugin(sinonChai)

describe('postGenerate', () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('runCommand()', () => {
    it('should return new promise for command', async () => {
      const stub = sandbox.stub(childProcess, 'exec')
      stub.yields(undefined, 'stdout')
      await pkg.runCommand('yarn build', '~/package-name')
      expect(stub).to.be.calledWithMatch('yarn build', { cwd: '~/package-name' })
    })

    it('should reject promise if error present', async () => {
      const stub = sandbox.stub(childProcess, 'exec')
      stub.yields(new Error('reject!'), 'stdout')
      expect(pkg.runCommand('yarn build', '~/package-name'))
        .to.eventually.to.be.rejectedWith('reject!')
    })
  })

  describe('installDependencies()', () => {
    context('package manager === yarn', () => {
      it('should install dependencies by yarn', () => {
        const stub = sandbox.stub(childProcess, 'spawnSync')
        sandbox.stub(console, 'log') // disable stdout

        pkg.installDependencies({ answers: { pm: 'yarn' }, folderPath: '~/package-name' })
        expect(stub).to.be.calledWith('yarn', ['install'], { cwd: '~/package-name', stdio: 'inherit' })
      })
    })

    context('package manager === npm', () => {
      it('should install dependencies by npm', () => {
        const stub = sandbox.stub(childProcess, 'spawnSync')
        sandbox.stub(console, 'log') // disable stdout

        pkg.installDependencies({ answers: { pm: 'npm' }, folderPath: '~/package-name' })
        expect(stub).to.be.calledWith('npm', ['install'], { cwd: '~/package-name', stdio: 'inherit' })
      })
    })
  })

  describe('createSymlink()', () => {
    it('should call exec function', () => {
      sandbox.stub(console, 'log') // hide console logs
      const stub = sandbox.stub(childProcess, 'exec')
      stub.yields(undefined, 'stdout')
      pkg.createSymlink({ answers: { pm: 'yarn' }, folderPath: '~/package-name' })
      expect(stub).to.be.calledWithMatch('yarn run createLink', { cwd: '~/package-name' })
    })
  })

  describe('addGitRemote()', () => {
    context('repository !== undefined', () => {
      it('should call exec function', () => {
        sandbox.stub(console, 'log') // hide console logs
        const stub = sandbox.stub(childProcess, 'exec')
        stub.yields(undefined, 'stdout')
        pkg.addGitRemote(
          {
            answers: { repository: 'https://github.com/username/pkg.git' },
            folderPath: '~/package-name'
          }
        )
        expect(stub).to.be.calledWithMatch(
          'git remote add origin git@github.com:username/pkg.git',
          { cwd: '~/package-name' }
        )
      })
    })

    context('repository === undefined', () => {
      it('should not call exec function', () => {
        sandbox.stub(console, 'log') // hide console logs
        const stub = sandbox.stub(childProcess, 'exec')
        stub.yields(undefined, 'stdout')
        pkg.addGitRemote({ answers: { repository: undefined }, folderPath: '~/package-name' })
        expect(stub).to.not.be.called
      })
    })
  })
})
