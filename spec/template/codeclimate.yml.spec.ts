import { CODECLIMATE_TOOL } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.codeclimate.yml'

describe(FILE_NAME, () => {
  context('Do not use codeclimate ci tool', () => {
    it('should not be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        codeQualityTools: []
      })

      expect(fileList).to.not.include(FILE_NAME)
    })
  })

  context('Use codeclimate ci tool', () => {
    it('should be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        codeQualityTools: [CODECLIMATE_TOOL]
      })

      expect(fileList).to.include(FILE_NAME)
    })
  })
})
