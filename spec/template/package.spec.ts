import {
  Answers,
  BROWSER_PLATFORM,
  CODECOV_TOOL,
  JAVASCRIPT,
  NODE_PLATFORM,
  TYPESCRIPT
} from '@friends-of-js/javascript-kit'
import { assertEachLanguage, resultsByLanguages } from '@friends-of-js/javascript-kit/spec'
import { expect } from 'chai'

const FILE_NAME = 'package.json'

describe(`${FILE_NAME}`, () => {
  describe('content', () => {
    describe('name', () => {
      it('should set "name" property value to given name', async () => {
        const name = 'test-package-name'
        const config: Partial<Answers> = { name }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('name').equal(name)
        })
      })
    })

    describe('private', () => {
      context('public === false', () => {
        it('should set "private" property value to "true"', async () => {
          const config: Partial<Answers> = { public: false }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content)
              .to.haveOwnProperty('private')
              .equal(true, 'package.private property should be true')
          })
        })
      })

      context('public === true', () => {
        it('should not have "private" property', async () => {
          const config: Partial<Answers> = { public: true }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('private')
          })
        })
      })
    })

    describe('publishConfig', () => {
      context('public === true', () => {
        it('should set "publishConfig.access" property value to "public"', async () => {
          const config: Partial<Answers> = { public: true }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.have.nested.property('publishConfig.access').equal('public')
          })
        })
      })

      context('public === false', () => {
        it('should set "publishConfig.access" property value to "restricted"', async () => {
          const config: Partial<Answers> = { public: false }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.have.nested.property('publishConfig.access').equal('restricted')
          })
        })
      })
    })

    describe('version', () => {
      it('should set "version" property value to given version', async () => {
        const config: Partial<Answers> = { initialVersion: '2.3.8' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('version').equal('2.3.8')
        })
      })
    })

    describe('license', () => {
      it('should set "license" property value to given license', async () => {
        const config: Partial<Answers> = { license: 'Apache-2.0' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('license').equal('Apache-2.0')
        })
      })
    })

    describe('homepage', () => {
      it('should set "homepage" property value to given homepage', async () => {
        const config: Partial<Answers> = { repository: 'https://github.com/user/package' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('homepage').equal('https://github.com/user/package')
        })
      })
    })

    describe('repository.url', () => {
      it('should set "repository.url" property value to given repository', async () => {
        const config: Partial<Answers> = { repository: 'https://github.com/user/package' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.have.nested.property('repository.url').equal('https://github.com/user/package')
        })
      })
    })

    describe('description', () => {
      it('should set "description" property value to given description', async () => {
        const config: Partial<Answers> = { description: 'package description' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('description').equal('package description')
        })
      })
    })

    describe('keywords', () => {
      it('should set "keywords" property value to given keywords', async () => {
        const config: Partial<Answers> = { keywords: 'first,second third,fourth' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('keywords').deep.equal(['first', 'second', 'third', 'fourth'])
        })
      })
    })

    describe('bugs.url', () => {
      it('should set "bugs.url" property value to given repository issues link', async () => {
        const config: Partial<Answers> = { repository: 'https://github.com/user/package' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.have.nested.property('bugs.url').equal('https://github.com/user/package/issues')
        })
      })
    })

    describe('bugs.email', () => {
      it('should set "bugs.email" property value to given user email', async () => {
        const config: Partial<Answers> = { email: 'test@example.com' }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.have.nested.property('bugs.email').equal('test@example.com')
        })
      })
    })

    describe('author', () => {
      it('should set "author" property value to given author', async () => {
        const config: Partial<Answers> = {
          author: 'Test User',
          email: 'test@example.com',
          website: 'https://github.com/user/package'
        }
        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content).to.haveOwnProperty('author').equal('Test User <test@example.com> (https://github.com/user/package)')
        })
      })
    })

    describe('contributors[0]', () => {
      it('should set "contributors[0]" property value according to given answers', async () => {
        const config: Partial<Answers> = {
          author: 'Test User',
          email: 'test@example.com',
          website: 'https://github.com/user/package'
        }

        await assertEachLanguage(FILE_NAME, config, content => {
          expect(content)
            .to.haveOwnProperty('contributors')
            .that.include('Test User <test@example.com> (https://github.com/user/package)')
        })
      })
    })

    describe('main', () => {
      context('useBuildTools && node', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }

        it('should have "main" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('main')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.main).to.equal(js.main)
        })
      })

      context('useBuildTools && browser', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }

        it('should have "main" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('main')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.main).to.equal(js.main)
        })
      })

      context('useBuildTools === false', () => {
        const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }

        it('should have "main" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('main')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.main).to.equal(js.main)
        })
      })
    })

    describe('module', () => {
      context('useBuildTools && node', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }

        it('should have "module" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('module')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.module).to.equal(js.module)
        })
      })

      context('useBuildTools && browser', () => {
        it('should not have "module" property', async () => {
          const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('module')
          })
        })
      })

      context('useBuildTools === false', () => {
        it('should not have "module" property', async () => {
          const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('module')
          })
        })
      })
    })

    describe('jsnext:main', () => {
      context('useBuildTools && node', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }

        it('should have "jsnext:main" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('jsnext:main')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts['jsnext:main']).to.equal(js['jsnext:main'])
        })
      })

      context('useBuildTools && browser', () => {
        it('should not have "jsnext:main" property', async () => {
          const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('jsnext:main')
          })
        })
      })

      context('useBuildTools === false', () => {
        it('should not have "jsnext:main" property', async () => {
          const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('jsnext:main')
          })
        })
      })
    })

    describe('browser', () => {
      context('useBuildTools && browser', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }

        it('should have "browser" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('browser')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.browser).to.equal(js.browser)
        })
      })

      context('useBuildTools && node', () => {
        it('should not have "browser" property', async () => {
          const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('browser')
          })
        })
      })

      context('useBuildTools === false', () => {
        it('should not have "browser" property', async () => {
          const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('browser')
          })
        })
      })
    })

    describe('unpkg', () => {
      context('useBuildTools && browser', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }

        it('should have "unpkg" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('unpkg')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.unpkg).to.equal(js.unpkg)
        })
      })

      context('useBuildTools && node', () => {
        it('should not have "unpkg" property', async () => {
          const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('unpkg')
          })
        })
      })

      context('useBuildTools === false', () => {
        it('should not have "unpkg" property', async () => {
          const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('unpkg')
          })
        })
      })
    })

    describe('jsdelivr', () => {
      context('useBuildTools && browser', () => {
        const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }

        it('should have "jsdelivr" property', async () => {
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.haveOwnProperty('jsdelivr')
          })
        })

        it('should have same value for all languages', async () => {
          const { ts, js } = await resultsByLanguages(FILE_NAME, config)
          expect(ts.jsdelivr).to.equal(js.jsdelivr)
        })
      })

      context('useBuildTools && node platform', () => {
        it('should not have "jsdelivr" property', async () => {
          const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('jsdelivr')
          })
        })
      })

      context('useBuildTools === false', () => {
        it('should not have "jsdelivr" property', async () => {
          const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
          await assertEachLanguage(FILE_NAME, config, content => {
            expect(content).to.not.haveOwnProperty('jsdelivr')
          })
        })
      })
    })

    describe('scripts', () => {
      describe('build', () => {
        context('useBuildTools', () => {
          context('node && browser', () => {
            it('should have "build" property', async () => {
              const config: Partial<Answers> = {
                useBuildTools: true,
                platforms: [NODE_PLATFORM, BROWSER_PLATFORM]
              }

              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build')
              })
            })
          })

          context('node', () => {
            it('should have "build" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build')
              })
            })
          })

          context('browser', () => {
            it('should have "build" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build')
            })
          })
        })
      })

      describe('build.module', () => {
        context('useBuildTools', () => {
          context('node', () => {
            it('should have "build.module" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build.module')
              })
            })
          })

          context('browser', () => {
            it('should not have "build.module" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.not.haveOwnProperty('build.module')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build.module" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build.module')
            })
          })
        })
      })

      describe('build.module.commonjs', () => {
        context('useBuildTools', () => {
          context('node', () => {
            it('should have "build.module.commonjs" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build.module.commonjs')
              })
            })
          })

          context('browser', () => {
            it('should not have "build.module.commonjs" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.not.haveOwnProperty('build.module.commonjs')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build.module.commonjs" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build.module.commonjs')
            })
          })
        })
      })

      describe('build.module.esnext', () => {
        context('useBuildTools', () => {
          context('node', () => {
            it('should have "build.module.esnext" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build.module.esnext')
              })
            })
          })

          context('browser', () => {
            it('should not have "build.module.esnext" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.not.haveOwnProperty('build.module.esnext')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build.module.esnext" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build.module.esnext')
            })
          })
        })
      })

      describe('build.browser', () => {
        context('useBuildTools', () => {
          context('browser', () => {
            it('should have "build.browser" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('build.browser')
              })
            })
          })

          context('node', () => {
            it('should not have "build.browser" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.not.haveOwnProperty('build.browser')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build.browser" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build.browser')
            })
          })
        })
      })

      describe('build.declarations', () => {
        context('useBuildTools', () => {
          it('should have "build.declarations" property', async () => {
            const config: Partial<Answers> = { useBuildTools: true, language: TYPESCRIPT }
            const { ts, js } = await resultsByLanguages(FILE_NAME, config)
            expect(ts.scripts).to.haveOwnProperty('build.declarations')
            expect(js.scripts).to.not.haveOwnProperty('build.declarations')
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "build.declarations" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, language: TYPESCRIPT }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('build.declarations')
            })
          })
        })
      })

      describe('analysis.bundle', () => {
        context('useBuildTools', () => {
          context('browser', () => {
            it('should have "analysis.bundle" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('analysis.bundle')
              })
            })
          })

          context('node', () => {
            it('should not have "analysis.bundle" property', async () => {
              const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.not.haveOwnProperty('analysis.bundle')
              })
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "analysis.bundle" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('analysis.bundle')
            })
          })
        })
      })

      describe('lint', () => {
        context('useLinter', () => {
          it('should have "lint" property', async () => {
            const config: Partial<Answers> = { useLinter: true }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('lint')
            })
          })
        })

        context('useLinter === false', () => {
          it('should not have "lint" property', async () => {
            const config: Partial<Answers> = { useLinter: false }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('lint')
            })
          })
        })
      })

      describe('fix', () => {
        context('useLinter', () => {
          it('should have "fix" property', async () => {
            const config: Partial<Answers> = { useLinter: true }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('fix')
            })
          })
        })

        context('useLinter === false', () => {
          it('should not have "fix" property', async () => {
            const config: Partial<Answers> = { useLinter: false }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('fix')
            })
          })
        })
      })

      describe('test', () => {
        context('useBuildTools', () => {
          context('node && browser', () => {
            const config: Partial<Answers> = {
              useBuildTools: true,
              platforms: [NODE_PLATFORM, BROWSER_PLATFORM]
            }

            it('should have "test" property', async () => {
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('test')
              })
            })

            it('should have same value for all languages', async () => {
              const { ts, js } = await resultsByLanguages(FILE_NAME, config)
              expect(ts.scripts.test).to.equal(js.scripts.test)
            })
          })

          context('node', () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }

            it('should have "test" property', async () => {
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('test')
              })
            })

            it('should have same value for all languages', async () => {
              const { ts, js } = await resultsByLanguages(FILE_NAME, config)
              expect(ts.scripts.test).to.equal(js.scripts.test)
            })
          })

          context('browser', () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }

            it('should have "test" property', async () => {
              await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
                expect(scripts).to.haveOwnProperty('test')
              })
            })

            it('should have same value for all languages', async () => {
              const { ts, js } = await resultsByLanguages(FILE_NAME, config)
              expect(ts.scripts.test).to.equal(js.scripts.test)
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should have "test" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test')
            })
          })
        })
      })

      describe('test.module', () => {
        context('useBuildTools && node', () => {
          it('should have "test.module" property', async () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test.module')
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "test.module" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('test.module')
            })
          })
        })
      })

      describe('test.browser', () => {
        context('useBuildTools && browser', () => {
          it('should have "test:browser" property', async () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test.browser')
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should not have "test.browser" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('test.browser')
            })
          })
        })
      })

      describe('test.watch', () => {
        context('useBuildTools === false', () => {
          it('should have "test.watch" property and use mocha for "test.watch"', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test.watch').match(/mocha/)
            })
          })
        })

        context('useBuildTools === false && node', () => {
          it('should have "test.watch" property and use mocha for "test.watch"', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test.watch').match(/mocha/)
            })
          })
        })

        context('useBuildTools && browser', () => {
          it('should have "test.watch" property and use karma for "test.watch"', async () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('test.watch').match(/karma/)
            })
          })
        })
      })

      describe('coverage', () => {
        it('should have "coverage" property on all languages', async () => {
          await assertEachLanguage(FILE_NAME, {}, ({ scripts }) => {
            expect(scripts).to.haveOwnProperty('coverage')
          })
        })
      })

      describe('coverage.generate', () => {
        context('useBuildTools && node', () => {
          it('should have "coverage.generate" property', async () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [NODE_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('coverage.generate')
            })
          })
        })

        context('useBuildTools && browser', () => {
          it('should have "coverage.generate" property', async () => {
            const config: Partial<Answers> = { useBuildTools: true, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('coverage.generate')
            })
          })
        })

        context('useBuildTools === false', () => {
          it('should have "coverage.generate" property', async () => {
            const config: Partial<Answers> = { useBuildTools: false, platforms: [BROWSER_PLATFORM] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('coverage.generate')
            })
          })
        })
      })

      describe('coverage.codecov', () => {
        context('codeQualityTools includes codecov', () => {
          it('should have "coverage.codecov" property', async () => {
            const config: Partial<Answers> = { codeQualityTools: [CODECOV_TOOL] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('coverage.codecov')
            })
          })
        })

        context('codeQualityTools not includes codecov', () => {
          it('should not have "coverage.codecov" property', async () => {
            const config: Partial<Answers> = { codeQualityTools: [] }
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.not.haveOwnProperty('coverage.codecov')
            })
          })
        })
      })

      describe('docs', () => {
        context('generateDocs', () => {
          const config: Partial<Answers> = { generateDocs: true }

          it('should have "docs" "docs.show", and "docs.publish" for all languages', async () => {
            await assertEachLanguage(FILE_NAME, config, ({ scripts }) => {
              expect(scripts).to.haveOwnProperty('docs')
              expect(scripts).to.haveOwnProperty('docs.show')
              expect(scripts).to.haveOwnProperty('docs.publish')
            })
          })

          it('should have "docs.html" "docs.json" for typescript language', async () => {
            const { ts } = await resultsByLanguages(FILE_NAME, config)
            expect(ts.scripts).to.haveOwnProperty('docs.html')
            expect(ts.scripts).to.haveOwnProperty('docs.json')
          })

          it('should have have equals values for "docs.show" for all languages', async () => {
            const { ts, js } = await resultsByLanguages(FILE_NAME, config)
            expect(ts.scripts['docs.show']).to.equal(js.scripts['docs.show'])
          })

          it('should have have equals values for "docs.publish" for all languages', async () => {
            const { ts, js } = await resultsByLanguages(FILE_NAME, config)
            expect(ts.scripts['docs.publish']).to.equal(js.scripts['docs.publish'])
          })
        })
      })
    })

    describe('devDependencies', () => {
      context('language === TypeScript', () => {
        context('browser', () => {
          it('should have dependencies specific for browser platform', async () => {
            const { ts } = await resultsByLanguages(FILE_NAME, { language: TYPESCRIPT, platforms: [BROWSER_PLATFORM] })
            const dependencies = Object.keys(ts.devDependencies)
            expect(dependencies).to.be.an('array').that.include.members(
              [
                '@types/webpack',
                '@types/webpack-dev-middleware',
                'awesome-typescript-loader',
                'istanbul-instrumenter-loader',
                'karma',
                'karma-chai',
                'karma-chrome-launcher',
                'karma-coverage',
                'karma-coverage-istanbul-reporter',
                'karma-firefox-launcher',
                'karma-mocha',
                'karma-mocha-reporter',
                'karma-notify-reporter',
                'karma-webpack',
                'ts-loader',
                'webpack',
                'webpack-build-notifier',
                'webpack-bundle-analyzer',
                'webpack-merge'
              ]
            )
          })
        })

        context('codeQualityTools includes codecov', () => {
          it('should have codecov in devDependencies', async () => {
            const config: Partial<Answers> = { codeQualityTools: [CODECOV_TOOL] }
            await assertEachLanguage(FILE_NAME, config, ({ devDependencies }) => {
              expect(devDependencies).to.haveOwnProperty('codecov')
            })
          })
        })

        context('useLinter', () => {
          it('should have "tslint" in dependencies', async () => {
            const config: Partial<Answers> = { useLinter: true }
            const { ts } = await resultsByLanguages(FILE_NAME, config)
            const dependencies = Object.keys(ts.devDependencies)
            expect(dependencies).to.be.an('array').that.include('tslint')
          })
        })

        context('generateDocs', () => {
          it('should have "typedoc" in dependencies', async () => {
            const config: Partial<Answers> = { generateDocs: true }
            const { ts } = await resultsByLanguages(FILE_NAME, config)
            const dependencies = Object.keys(ts.devDependencies)
            expect(dependencies).to.be.an('array').that.include('typedoc')
          })
        })
      })

      context('language === JavaScript', () => {
        context('useBuildTools', () => {
          it('should have dependencies for build tools', async () => {
            const { js } = await resultsByLanguages(FILE_NAME, { language: JAVASCRIPT })
            const dependencies = Object.keys(js.devDependencies)
            expect(dependencies).to.be.an('array').that.include.members(
              [
                'babel-cli',
                'babel-register',
                'babel-preset-env',
                'babel-preset-stage-0',
                'babel-preset-stage-1',
                'babel-preset-stage-2',
                'babel-preset-stage-3'
              ]
            )
          })
        })

        context('browser', () => {
          it('should have dependencies specific for browser platform', async () => {
            const { js } = await resultsByLanguages(FILE_NAME, { language: JAVASCRIPT, platforms: [BROWSER_PLATFORM] })
            const dependencies = Object.keys(js.devDependencies)
            expect(dependencies).to.be.an('array').that.include.members(
              [
                'babel-loader',
                'istanbul-instrumenter-loader',
                'karma',
                'karma-chai',
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-mocha',
                'karma-mocha-reporter',
                'karma-notify-reporter',
                'karma-webpack',
                'webpack',
                'webpack-build-notifier',
                'webpack-bundle-analyzer',
                'webpack-merge'
              ]
            )
          })
        })

        context('useLinter', () => {
          it('should have "tslint" in dependencies', async () => {
            const config: Partial<Answers> = { language: JAVASCRIPT, useLinter: true }
            const { js } = await resultsByLanguages(FILE_NAME, config)
            const dependencies = Object.keys(js.devDependencies)
            expect(dependencies).to.be.an('array').that.include('eslint')
          })
        })

        context('generateDocs', () => {
          it('should have "typedoc" in dependencies', async () => {
            const config: Partial<Answers> = { language: JAVASCRIPT, generateDocs: true }
            const { js } = await resultsByLanguages(FILE_NAME, config)
            const dependencies = Object.keys(js.devDependencies)
            expect(dependencies).to.be.an('array').that.include.members(['esdoc', 'esdoc-standard-plugin'])
          })
        })
      })
    })
  })
})
