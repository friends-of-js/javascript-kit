import { CODACY_TOOL } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.codacy.yml'

describe(FILE_NAME, () => {
  context('Do not use codacy code quality tool', () => {
    it('should not be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        codeQualityTools: []
      })

      expect(fileList).to.not.include(FILE_NAME)
    })
  })

  context('Use codacy code quality tool', () => {
    it('should be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        codeQualityTools: [CODACY_TOOL]
      })

      expect(fileList).to.include(FILE_NAME)
    })
  })
})
