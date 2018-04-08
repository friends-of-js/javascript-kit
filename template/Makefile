<% if (useBuildTools) { -%>
.PHONY: build
<% } -%>
.PHONY: test test.with.coverage test.watch coverage coverage.generate coverage.show
.PHONY: release.major release.minor release.patch release.pre commit clean
<% if (useBuildTools && platforms.includes(this.NODE_PLATFORM)) { -%>
.PHONY: build.module build.module.commonjs build.module.esnext
<% } -%>
<% if (useBuildTools && language === this.TYPESCRIPT) { -%>
.PHONY: build.declarations
<% } -%>
<% if (useBuildTools && platforms.includes(this.BROWSER_PLATFORM)) { -%>
.PHONY: build.browser analysis.bundle
<% } -%>
<% if (useLinter) { -%>
.PHONY: lint fix
<% } -%>
<% if (useBuildTools && platforms.includes(this.NODE_PLATFORM)) { -%>
.PHONY: test.module
<% } -%>
<% if (useBuildTools && platforms.includes(this.BROWSER_PLATFORM)) { -%>
.PHONY: test.browser
<% } -%>
<% if (codeQualityTools.includes('codecov')) { -%>
.PHONY: coverage.codecov
<% } -%>
<% if (codeQualityTools.includes('codacy')) { -%>
.PHONY: coverage.codacy
<% } -%>
<% if (generateDocs) { -%>
.PHONY: docs docs.show docs.publish
<% } -%>
<% if (language === this.TYPESCRIPT) { -%>
.PHONY: docs.html docs.json
<% } -%>
<% if (useBuildTools) { -%>

all: build
<% } -%>

<% if (useBuildTools) { -%>
build:
	<%= pm %> run build
<% } -%>
<% if (useBuildTools && platforms.includes(this.NODE_PLATFORM)) { -%>
build.module:
	<%= pm %> run build.module
build.module.commonjs:
	<%= pm %> run build.module.commonjs
build.module.esnext:
	<%= pm %> run build.module.esnext
<% } -%>
<% if (useBuildTools && language === this.TYPESCRIPT) { -%>
build.declarations:
	<%= pm %> run build.declarations
<% } -%>
<% if (useBuildTools && platforms.includes(this.BROWSER_PLATFORM)) { -%>
build.browser:
	<%= pm %> run build.browser
analysis.bundle:
	<%= pm %> run analysis.bundle
<% } -%>
<% if (useLinter) { -%>
lint:
	<%= pm %> run lint
fix:
	<%= pm %> run fix
<% } -%>
test:
	<%= pm %> run test
<% if (useBuildTools && platforms.includes(this.NODE_PLATFORM)) { -%>
test.module:
	<%= pm %> run test.module
<% } -%>
<% if (useBuildTools && platforms.includes(this.BROWSER_PLATFORM)) { -%>
test.browser:
	<%= pm %> run test.browser
<% } -%>
test.with.coverage:
	<%= pm %> run test.with.coverage
test.watch:
	<%= pm %> run test.watch
coverage:
	<%= pm %> run coverage
coverage.show:
	<%= pm %> run coverage.show
coverage.generate:
	<%= pm %> run coverage.generate
<% if (codeQualityTools.includes('codecov')) { -%>
coverage.codecov:
	<%= pm %> run coverage.codecov
<% } -%>
<% if (codeQualityTools.includes('codacy')) { -%>
coverage.codacy:
	<%= pm %> run coverage.codacy
<% } -%>
<% if (codeQualityTools.includes('codeclimate')) { -%>
coverage.codeclimate:
	<%= pm %> run coverage.codeclimate
<% } -%>
<% if (generateDocs) { -%>
docs:
	<%= pm %> run docs
<% if (language === this.TYPESCRIPT) { -%>
docs.html:
	<%= pm %> run docs.html
docs.json:
	<%= pm %> run docs.json
<% } -%>
docs.show:
	<%= pm %> run docs.show
docs.publish:
	<%= pm %> run docs.publish
<% } -%>
release.major:
	<%= pm %> run release.major
release.minor:
	<%= pm %> run release.minor
release.patch:
	<%= pm %> run release.patch
release.pre:
	<%= pm %> run release.pre
commit:
	<%= pm %> run commit
<% if (useBuildTools) { -%>
clean:
	<%= pm %> run clean
<% } -%>
