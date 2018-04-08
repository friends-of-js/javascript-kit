import {
  AVAILABLE_CODEQUALITY_TOOLS,
  BROWSER_PLATFORM,
  JAVASCRIPT,
  NODE_PLATFORM,
  STANDARD_CONFIG_TYPE,
  TRAVIS_CI_TOOL,
  TYPESCRIPT,
  data,
  prompts
} from '@friends-of-js/javascript-kit'
import { GIT_USER_EMAIL, GIT_USER_NAME, TEMPLATE_PATH } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'
import * as sao from 'sao'

describe('SAO config', () => {
  describe('prompts', () => {
    describe('default answers', () => {
      it('should have default values for all questions', async () => {
        const { meta: { merged: answers } } = await sao.mockPrompt(TEMPLATE_PATH, {})
        expect(answers).to.haveOwnProperty('pm').equal('yarn')
        expect(answers).to.haveOwnProperty('public').equal(true, 'default value for "public" should be true')
        expect(answers).to.haveOwnProperty('initialVersion').equal('1.0.0')
        expect(answers).to.haveOwnProperty('license').equal('MIT')
        expect(answers).to.haveOwnProperty('description').that.is.a('string').with.length(0)
        expect(answers).to.haveOwnProperty('keywords').that.is.a('string').with.length(0)
        expect(answers).to.haveOwnProperty('author').match(new RegExp(GIT_USER_NAME, 'i'))
        expect(answers).to.haveOwnProperty('username').match(new RegExp(GIT_USER_NAME, 'i'))
        expect(answers).to.haveOwnProperty('email').equal(GIT_USER_EMAIL)
        expect(answers).to.haveOwnProperty('repository').equal(`https://github.com/${GIT_USER_NAME.toLowerCase()}/${answers.name}`)
        expect(answers).to.haveOwnProperty('website').equal(`https://github.com/${GIT_USER_NAME.toLowerCase()}`)
        expect(answers).to.haveOwnProperty('language').equal(TYPESCRIPT)
        expect(answers).to.haveOwnProperty('useBuildTools').equal(true, '"useBuildTools" property should be true')
        expect(answers).to.haveOwnProperty('platforms')
          .that.is.a('array').that.include.members([NODE_PLATFORM, BROWSER_PLATFORM])
        expect(answers).to.haveOwnProperty('tsConfigType').equal(STANDARD_CONFIG_TYPE)
        expect(answers).to.haveOwnProperty('useLinter').equal(true, '"useLinter" property should be true')
        expect(answers).to.haveOwnProperty('tslintConfigType').equal(STANDARD_CONFIG_TYPE)
        expect(answers).to.haveOwnProperty('tsTarget').equal('es5')
        expect(answers).to.haveOwnProperty('generateDocs').equal(true, '"generateDocs" property should be true')
        expect(answers).to.haveOwnProperty('ciTools').that.is.a('array').that.includes.members([TRAVIS_CI_TOOL])
        expect(answers).to.haveOwnProperty('codeQualityTools')
          .that.is.a('array').that.includes.members(AVAILABLE_CODEQUALITY_TOOLS)
        expect(answers).to.haveOwnProperty('extension').equal('ts')
      })
    })

    describe('name', () => {
      describe('validate', () => {
        it('should return error message if package name not valid', async () => {
          expect(prompts.name.validate('_packageName')).to.equal('Not valid package name!')
          expect(prompts.name.validate('package-name')).to.equal(true, 'return true if name valid npm package name')
        })
      })

      describe('filter', () => {
        it('should convert package name to lower case', () => {
          expect(prompts.name.filter('Package-Name')).to.equal('package-name')
        })
      })
    })

    describe('initialVersion', () => {
      describe('validate', () => {
        it('should return error message if version not valid', async () => {
          expect(prompts.initialVersion.validate('1.d.5')).to.equal('Wrong semantic version!')
          expect(prompts.initialVersion.validate('2.5.7')).to.equal(true, 'true when version valid semantic version')
        })
      })
    })

    describe('username', () => {
      describe('filter', () => {
        it('should convert username to lower case', async () => {
          expect(prompts.username.filter('USER')).to.equal('user')
        })
      })
    })

    describe('repository', () => {
      describe('default', () => {
        context('not org scoped package', () => {
          it('should generate default value based on given answers', () => {
            expect(prompts.repository.default({ username: 'user', name: 'pkg' }))
              .to.equal('https://github.com/user/pkg')
          })
        })
        context('org scoped package', () => {
          it('should generate default value based on given answers', () => {
            expect(prompts.repository.default({ username: 'user', name: '@company/pkg' }))
              .to.equal('https://github.com/company/pkg')
          })
        })
      })
    })

    describe('website', () => {
      describe('default', () => {
        context('not org scoped package', () => {
          it('should generate default value based on given answers', () => {
            expect(prompts.website.default({ username: 'user', name: 'pkg' }))
              .to.equal('https://github.com/user')
          })
        })

        context('org scoped package', () => {
          it('should generate default value based on given answers', () => {
            expect(prompts.website.default({ username: 'user', name: '@company/pkg' }))
              .to.equal('https://github.com/company')
          })
        })
      })
    })

    describe('platforms', () => {
      describe('when', () => {
        it('should return true when useBuildTools', () => {
          expect(prompts.platforms.when({ useBuildTools: true })).to.equal(true, 'true when useBuildTools === true')
          expect(prompts.platforms.when({ useBuildTools: false })).to.equal(false, 'false when useBuildTools === false')
        })
      })
      describe('validate', () => {
        it('should return error message if no platforms chosen', async () => {
          expect(prompts.platforms.validate([])).to.equal('You should check at least one platform!')
        })

        it('should return platforms if they present', () => {
          expect(prompts.platforms.validate([NODE_PLATFORM])).to.equal(true, 'return true if platforms length >= 1')
        })
      })
    })

    describe('tsConfigType', () => {
      describe('when', () => {
        it('should return true when language === TypeScript', () => {
          expect(prompts.tsConfigType.when({ language: TYPESCRIPT })).to.equal(true, 'true when language === TypeScript')
          expect(prompts.tsConfigType.when({ language: JAVASCRIPT })).to.equal(false, 'false when language === JavaScript')
        })
      })
    })

    describe('tslintConfigType', () => {
      describe('when', () => {
        context('useLinter', () => {
          it('should return true when language === TypeScript', () => {
            expect(prompts.tslintConfigType.when({ language: TYPESCRIPT, useLinter: true }))
              .to.equal(true, 'true when language === TypeScript && useLinter === true')
            expect(prompts.tslintConfigType.when({ language: JAVASCRIPT, useLinter: true }))
              .to.equal(false, 'false when language === JavaScript && useLinter === true')
          })
        })

        context('useLinter === false', () => {
          it('should return false when useLinter === false', () => {
            expect(prompts.tslintConfigType.when({ language: TYPESCRIPT, useLinter: false }))
              .to.equal(false, 'true when language === TypeScript')
          })
        })
      })
    })

    describe('tsTarget', () => {
      describe('when', () => {
        it('should return true when language === TypeScript', () => {
          expect(prompts.tsTarget.when({ language: TYPESCRIPT })).to.equal(true, 'true when language === TypeScript')
          expect(prompts.tsTarget.when({ language: JAVASCRIPT })).to.equal(false, 'false when language === JavaScript')
        })
      })
    })
  })

  describe('data', () => {
    describe('platforms', () => {
      it('should return empty array if platforms in answers is undefined', () => {
        expect(data({ language: TYPESCRIPT }))
          .to.haveOwnProperty('platforms')
          .that.is.a('array').with.length(0)
      })

      it('should return platforms if they present', () => {
        expect(data({ platforms: [NODE_PLATFORM] }))
          .to.haveOwnProperty('platforms')
          .that.is.a('array').that.deep.equal([NODE_PLATFORM])
      })
    })

    describe('extension', () => {
      it('should return extension based on passed language', () => {
        expect(data({ language: TYPESCRIPT })).to.haveOwnProperty('extension').equal('ts')
        expect(data({ language: JAVASCRIPT })).to.haveOwnProperty('extension').equal('js')
      })
    })

    describe('packageTarFileName', () => {
      it('should return packageTarFileName prepared from name', () => {
        expect(data({ name: 'package-name' })).to.haveOwnProperty('packageTarFileName').equal('package-name')
        expect(data({ name: '@company/package-name' }))
          .to.haveOwnProperty('packageTarFileName').equal('company-package-name')
      })
    })
  })
})
