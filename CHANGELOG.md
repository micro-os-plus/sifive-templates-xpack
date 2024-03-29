# Change log

Changes in reverse chronological order.

The latest public version is [@sifive/templates](https://www.npmjs.com/package/@sifive/templates/).

Please check
[GitHub](https://github.com/micro-os-plus/sifive-templates-xpack/issues/)
and close existing issues and pull requests.

## 2022-05-09

- v1.2.10
- add bundledDependencies

## 2020-11-18

- v1.2.9
- [#7] - disable the greedy behaviour

## v1.2.8 (2020-09-19)

- package.json.liquid: bump windows-build-tools to 2.12.2-2

## v1.2.7 (2020-09-19)

- [#6] create the -C folder
- README.md.liquid: update fro Embedded CDT & xPack
- package.json.liquid: start with 0.0.1, bump deps
- template.js: update for new Liquid object engine
- xmake.json/build: remove -Wabi

## v1.2.6 (2018-05-01)

- test/test.js: show command to run
- README: intro to explain dual nature, xpack/module
- add devDependency to xpm; update travis & appVeyor

## v1.2.5 (2018-04-25)

- package.json.liquid: add reference to @micro-os-plus/semihosting

## v1.2.4 (2018-04-23)

- add .appveyor.yml
- test: fix names containing spaces
- package.json: start test via explicit node
- test/test.js: no need for \\ substitution
- package.json: start test-all via node too
- test/test.js: shorten project name; the resulting paths were too long for pre Windows 10

## v1.2.3 (2018-04-22)

- package.json.liquid: bump versions; since xpm 0.4.x no longer need the DLLs

## v1.2.2 (2018-04-22)

- package.json.liquid: bump binary tools deps

## v1.2.1 (2018-04-15)

- add .travis.yml

## v1.2.0 (2018-04-15)

- rework tests, functional on posix
- package.json: cleanup "link" script
- README: update user, developer, maintainer

## v1.1.0 (2018-04-15)

- bump deps; first fully functional from xpm

## v1.0.4 (2018-04-15)

- add XpmInitTemplate class

## v1.0.3 (2018-01-24)

- xmake.json: update for semihosting

## v1.0.2 (2018-01-24)

- update dependencies

## v1.0.1 (2018-01-24)

- add semihosting combinations to CLI generator
- cli: render jlink.launch too
- main.liquid: fix trace, all 288 combinations ok
- package.json: add semihosting to 'run link'

## v1.0.0 (2018-01-24)

- [#2] automatically set openocd.enableSemihosting
- [#3] add J-Link debug launcher
- [#4] main.liquid: add simple full semihosting test
- README: update to mention semihosting

## 2018-01-21

- [#2] Automatically set openocd.enableSemihosting

## 2018-01-15

- [#1] depend on @micro-os-plus/semihosting

## 2018-01-09

- add dependence on @micro-os-plus/semihosting

## v0.2.0 (2018-01-09)

- README: add git log line

## 2017-12-28

- README: fix sifive-hifive1.cfg reference

## 2017-12-27

- rename `id` in device & board

## v0.1.1 (2017-11-10)

- interrupt-handlers.c.cpp.liquid: remove empty line

## v0.1.0 (2017-11-10)

- switch toolchain to riscv-none-gcc
- add preliminary local 'run test & test-all'; use nested loops over properties
- fix interrupt handler names; use deviceName; use `OS_USE_CPP_INTERRUPTS`
- rework interrupts to use namespaces
- `interrupts-handlers*`: shorten prefix to `sifive_int*`
- `src/initialize-hardware`: fix LED1 clear
- `ldscripts/sections.ld`: ENTRY(riscv_reset_entry); to be sure debuggers/simulators properly set the stack
- `mem-e[35]1arty.ld`: fix RAM size, 16 KB
- `interrupts-handlers.c.cpp.liquid`: separate e31/e51; use the device specific interrupt name
- `oocd.launch.liquid`: update scripts names; remove coreplex, shorten hifive1
- initialize-hardware.c.cpp.liquid: fix PRCI inits
- led.c.cpp: fix gpio port usage
- liquid: deviceName e[35]1arty
- assets: os::sysclock, os_sysclock
- `include/*`: rename csr `set/clear_*_bits`
- `src/initialize*` interrupts-*: use prefixed CSRs
- move liquid below assets
- liquid/ldscripts/sections.ld: simplify; no separate local arch & device arrays
- update for `device-peripherals.h`; make `led-c.h` & `led-cpp.h` templates
- rename bin/xpm-init-sifive-project.js

## v0.0.14 (2017-10-05)

- main-liquid.c.cpp: remove c empty line

## v0.0.13 (2017-10-05)

- main-liquid.c.cpp: add 'using namespace os;'
- package-liquid.json: add script for 'clean'
- package.json: update GitHub links to -xpack

## v0.0.12 (2017-10-04)

- package-liquid.json: add devDependencies

## v0.0.11 (2017-10-04)

- remove shrinkwrap, recreate lock

## v0.0.10 (2017-10-04)

- `package.json` clean-ups
- add `CHANGELOG.md`

## v0.0.9, v0.0.8 (2017-09-20)

- README.md: document the project generation

## v0.0.7, v0.0.6, v0.0.5, v0.0.4 (2017-09-18)

- liquid: use '-%}'; rename LICENSE.liquid
- executable functional

## v0.0.3, v0.0.2 (2017-09-10)

- arty ram is 64K
- add java & scripts to make it executable (`xgen-sifive-coreplex-project`)

## v0.0.1 (2017-09-09)

- initial version, inspired from Eclipse templates.


