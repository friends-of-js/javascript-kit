import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.gitignore'

describe(FILE_NAME, () => {
  describe('content', () => {
    context('generateDocs = true', () => {
      it('should ignore docs folder', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          generateDocs: true
        })

        const content = stream.fileContents(FILE_NAME)

        expect(content).to.match(/# Ignore generated docs\ndocs/)
      })
    })

    context('generateDocs = false', () => {
      it('should not ignore docs folder', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          generateDocs: false
        })

        const content = stream.fileContents(FILE_NAME)

        expect(content).to.not.match(/# Ignore generated docs\ndocs/)
      })
    })
  })
})
