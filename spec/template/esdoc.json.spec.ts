import { JAVASCRIPT, TYPESCRIPT } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.esdoc.json'

describe(FILE_NAME, () => {
  context('language === JavaScript', () => {
    context('generateDocs', () => {
      it('should be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT,
          generateDocs: true
        })

        expect(fileList).to.include(FILE_NAME)
      })
    })

    context('generateDocs === false', () => {
      it('should not be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: JAVASCRIPT,
          generateDocs: false
        })

        expect(fileList).to.not.include(FILE_NAME)
      })
    })
  })

  context('language === TypeScript', () => {
    context('generateDocs', () => {
      it('should not be copied', async () => {
        const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
          language: TYPESCRIPT,
          generateDocs: true
        })

        expect(fileList).to.not.include(FILE_NAME)
      })
    })
  })
})
