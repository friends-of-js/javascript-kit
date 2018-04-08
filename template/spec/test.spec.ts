import { expect } from 'chai'
import { Test } from '<%= name %>'

describe('Test class', () => {
  describe('#method', () => {
    it('return 123', () => {
      expect(new Test().method()).to.eq(123)
    })
  })
})
