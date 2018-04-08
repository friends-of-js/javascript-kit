.PHONY: build
.PHONY: test test.with.coverage test.watch coverage coverage.generate coverage.show
.PHONY: release.major release.minor release.patch release.pre commit clean
.PHONY: build.module build.module.commonjs
.PHONY: lint fix
.PHONY: test.module
.PHONY: coverage.codecov
.PHONY: docs docs.show docs.publish
.PHONY: docs.html docs.json

all: build

build:
	yarn run build
build.module:
	yarn run build.module
build.module.commonjs:
	yarn run build.module.commonjs
lint:
	yarn run lint
fix:
	yarn run fix
test:
	yarn run test
test.module:
	yarn run test.module
test.with.coverage:
	yarn run test.with.coverage
test.watch:
	yarn run test.watch
coverage:
	yarn run coverage
coverage.show:
	yarn run coverage.show
coverage.generate:
	yarn run coverage.generate
coverage.codecov:
	yarn run coverage.codecov
coverage.codeclimate:
	yarn run coverage.codeclimate
docs:
	yarn run docs
docs.html:
	yarn run docs.html
docs.json:
	yarn run docs.json
docs.show:
	yarn run docs.show
docs.publish:
	yarn run docs.publish
release.major:
	yarn run release.major
release.minor:
	yarn run release.minor
release.patch:
	yarn run release.patch
release.pre:
	yarn run release.pre
commit:
	yarn run commit
clean:
	yarn run clean
