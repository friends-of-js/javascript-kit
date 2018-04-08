import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = 'LICENSE'

describe(FILE_NAME, () => {
  describe('content', () => {
    context('website passed', () => {
      it('should create copyright in license', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          website: 'test-package.com',
          author: 'Test User',
          email: 'test@test-package.com'
        })

        const content = stream.fileContents(FILE_NAME)
        expect(content).to.match(new RegExp(`${new Date().getUTCFullYear()}-present`, 'g'))
        expect(content).to.match(/Test User <test@test-package\.com> \(test-package\.com\)/)
      })
    })

    context('website not passed', () => {
      it('should create copyright in license', async () => {
        const stream = await sao.mockPrompt(TEMPLATE_PATH, {
          username: 'testuser',
          author: 'Test User',
          email: 'test@test-package.com'
        })

        const content = stream.fileContents(FILE_NAME)
        expect(content).to.match(new RegExp(`${new Date().getUTCFullYear()}-present`, 'g'))
        expect(content).to.match(/Test User <test@test-package\.com> \(https:\/\/github\.com\/testuser\)$/gm)
      })
    })
  })
})
