import { expect, use as applyChaiPlugin } from 'chai'
import * as mockery from 'mockery'
import * as path from 'path'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

applyChaiPlugin(sinonChai)

describe('cliMethods', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true // important if many test cases present
    })
  })
  after(() => {
    mockery.disable()
  })

  describe('generateFromTemplate()', () => {
    let sandbox: sinon.SinonSandbox
    let saoStub: sinon.SinonStub
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      saoStub = sandbox.stub()
      mockery.registerMock('sao', saoStub)
    })

    afterEach(() => {
      sandbox.restore()
      mockery.deregisterAll()
      mockery.resetCache()
    })

    it('should output error and exit with code === 2', async () => {
      sandbox.stub(process, 'argv').get(() => ['node', 'cli', 'not-empty-dir'])
      const errorStub = sandbox.stub(console, 'error') // suppress error warning
      const exitStub = sandbox.stub(process, 'exit')
      saoStub.returns(Promise.reject('Something went wrong!'))
      await import('../src/cliMethods').then(async ({ generateFromTemplate }) => generateFromTemplate())
      expect(exitStub).to.be.calledWith(2)
      expect(errorStub).to.be.calledWith('Something went wrong!')
    })
  })

  describe('generate()', () => {
    context('targetPath exists && target path is empty dir', () => {
      let sandbox: sinon.SinonSandbox
      let saoStub: sinon.SinonStub
      beforeEach(() => {
        sandbox = sinon.sandbox.create()
        const fsMock = {
          existsSync: () => true,
          readdirSync: () => []
        }
        mockery.registerMock('fs', fsMock)
        saoStub = sandbox.stub()
        saoStub.returns(Promise.resolve(true))
        mockery.registerMock('sao', saoStub)
      })

      afterEach(() => {
        sandbox.restore()
        mockery.deregisterAll()
        mockery.resetCache()
      })

      context('directory passed in cli arguments', () => {
        it('should call sao', async () => {
          sandbox.stub(process, 'argv').get(() => ['node', 'cli', 'pkg-directory'])
          await import('../src/cliMethods').then(async ({ generate }) => generate())
          expect(saoStub).to.be.calledWith({ template: path.resolve(__dirname, '../'), targetPath: 'pkg-directory' })
        })
      })

      context('directory not passed in cli arguments', () => {
        it('should call sao', async () => {
          sandbox.stub(process, 'argv').get(() => ['node', 'cli'])
          await import('../src/cliMethods').then(async ({ generate }) => generate())
          expect(saoStub).to.be.called
          expect(saoStub).to.be.calledWith({ template: path.resolve(__dirname, '../'), targetPath: '.' })
        })
      })
    })

    context('target path is not empty dir', () => {
      let sandbox: sinon.SinonSandbox
      let saoStub: sinon.SinonStub
      beforeEach(() => {
        sandbox = sinon.sandbox.create()
        const fsMock = {
          existsSync: () => true,
          readdirSync: () => ['file']
        }
        mockery.registerMock('fs', fsMock)
        saoStub = sandbox.stub()
        saoStub.returns(Promise.resolve(true))
        mockery.registerMock('sao', saoStub)
      })

      afterEach(() => {
        sandbox.restore()
        mockery.deregisterAll()
        mockery.resetCache()
      })

      context('enforceDirectory === true', () => {
        it('should call sao', async () => {
          sandbox.stub(process, 'argv').get(() => ['node', 'cli', 'not-empty-dir'])
          const inquirerMock = {
            prompt () {
              return { enforceDirectory: true }
            }
          }
          mockery.registerMock('inquirer', inquirerMock)
          await import('../src/cliMethods').then(async ({ generate }) => generate())
          expect(saoStub).to.be.calledWith({ template: path.resolve(__dirname, '../'), targetPath: 'not-empty-dir' })
        })
      })

      context('enforceDirectory === false', () => {
        it('should exit with code === 1', async () => {
          sandbox.stub(process, 'argv').get(() => ['node', 'cli', 'not-empty-dir'])
          sandbox.stub(console, 'error') // suppress error warning
          const exitStub = sandbox.stub(process, 'exit')
          const inquirerMock = {
            prompt () {
              return { enforceDirectory: false }
            }
          }
          mockery.registerMock('inquirer', inquirerMock)
          await import('../src/cliMethods').then(async ({ generate }) => generate())
          expect(exitStub).to.be.calledWith(1)
        })
      })
    })
  })
})
