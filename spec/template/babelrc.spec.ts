import { JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.babelrc'

describe(FILE_NAME, () => {
  context('JavaScript language', () => {
    context('Use build tools', () => {
      it('should be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT,
          useBuildTools: true
        })

        expect(fileList).to.include(FILE_NAME)
      })
    })

    context('Do not use build tools', () => {
      it('should not be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT,
          useBuildTools: false
        })

        expect(fileList).to.not.include(FILE_NAME)
      })
    })
  })

  context('TypeScript language', () => {
    it('should not be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        language: TYPESCRIPT
      })

      expect(fileList).to.not.include(FILE_NAME)
    })
  })
})
