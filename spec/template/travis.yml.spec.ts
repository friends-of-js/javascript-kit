import { TRAVIS_CI_TOOL } from '@friends-of-js/javascript-kit'
import { TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

const FILE_NAME = '.travis.yml'

describe(FILE_NAME, () => {
  context('Do not use travis ci tool', () => {
    it('should be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        ciTools: []
      })

      expect(fileList).to.not.include(FILE_NAME)
    })
  })

  context('Use travis ci tool', () => {
    it('should be copied', async () => {
      const { fileList } = await sao.mockPrompt(TEMPLATE_PATH, {
        ciTools: [TRAVIS_CI_TOOL]
      })

      expect(fileList).to.include(FILE_NAME)
    })
  })
})
