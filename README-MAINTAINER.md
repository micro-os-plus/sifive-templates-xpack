[![license](https://img.shields.io/github/license/sifive/templates-xpack)](https://github.com/sifive/templates-xpack/blob/xpack/LICENSE)
[![CI on Push](https://github.com/sifive/templates-xpack/actions/workflows/CI.yml/badge.svg)](https://github.com/sifive/templates-xpack/actions/workflows/CI.yml)
[![GitHub issues](https://img.shields.io/github/issues/sifive/templates-xpack.svg)](https://github.com/sifive/templates-xpack/issues/)
[![GitHub pulls](https://img.shields.io/github/issues-pr/sifive/templates-xpack.svg)](https://github.com/sifive/templates-xpack/pulls/)

# Maintainer info

This file documents the procedure used to make releases.

## Prepare the release

Before making the release, perform some checks and tweaks.

### Update npm packages

- `npm outdated`
- edit `package.json` and `npm install`
- repeat until everything is up to date

### Check Git

In this Git repo:

- in the `develop` branch
- push everything
- if needed, merge the `master` branch

### Determine the next version

Use the semantic versioning semantics.

Edit `package.json` to this version suffixed by `-pre`.

### Fix possible open issues

Check GitHub issues and pull requests:

- <https://github.com/sifive/templates-xpack/issues/>

### Update versions in the README files

- update version in `README-MAINTAINER.md`
- check the rest of the file and update if needed, to reflect the new features
- update version in `README.md`

## Update `CHANGELOG.md`

- check the latest commits `npm run git-log`
- open the `CHANGELOG.md` file
- check if all previous fixed issues are in
- commit with a message like _prepare v1.2.10_

## Publish on the npmjs.com server

- select the `xpack-develop` branch
- commit everything
- `npm run fix`
- commit all changes
- `npm run test`
- check the latest commits `npm run git-log`
- `npm run pack`; check the content of the archive, which should list
  only the following; possibly adjust `.npmignore`

```console
CHANGELOG.md
LICENSE
README.md
assets/...
index.js
lib/template.js
package.json
=== Bundled Dependencies ===
```

- `npm version patch`, `npm version minor`, `npm version major`
- push all changes to GitHub; this should trigger CI
- push tag
- **wait for CI tests to complete**
- check <https://github.com/sifive/templates-xpack/actions/>
- `npm publish --tag next` (use `--access public` when publishing for
  the first time)

The version is visible at:

- <https://www.npmjs.com/package/@sifive/templates?activeTab=versions>

## Testing

The first test is via `xpm init`

```sh
mkdir -p ~/tmp/test-sifive && cd ~/tmp/test-sifive
xpm init --template @sifive/templates@next --property boardName=hifive1
xpm install
xpm run build
```

The project also includes unit tests, which create multiple projects,
with combinations of properties.

To run them, use:

```sh
cd sifive-templates-xpack.git
xpm install
xpm run test
```

## Continuous Integration

All available tests are also performed on GitHub Actions, as the
[CI on Push](https://github.com/micro-os-plus/sifive-templates-xpack/actions/workflows/CI.yml)
workflow.

## Update the repo

When the package is considered stable:

- with a git client
- merge `xpack-develop` into `xpack`
- push to GitHub
- select `xpack-develop`

## Tag the npm package as `latest`

When the release is considered stable, promote it as `latest`:

- `npm dist-tag ls @sifive/templates`
- `npm dist-tag add @sifive/templates@1.2.10 latest`
- `npm dist-tag ls @sifive/templates`