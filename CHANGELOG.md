## Change log

Changes in reverse chronological order.

### v0.2.0 2018-01-09 

* README: add git log line

### 2017-12-28 

* README: fix sifive-hifive1.cfg reference

### 2017-12-27

* rename `id` in device & board

### v0.1.1 (2017-11-10)

* interrupt-handlers.c.cpp.liquid: remove empty line

### v0.1.0 (2017-11-10)

* switch toolchain to riscv-none-gcc
* add preliminary local 'run test & test-all'; use nested loops over properties
* fix interrupt handler names; use deviceName; use `OS_USE_CPP_INTERRUPTS`
* rework interrupts to use namespaces
* `interrupts-handlers*`: shorten prefix to `sifive_int*`
* `src/initialize-hardware`: fix LED1 clear
* `ldscripts/sections.ld`: ENTRY(riscv_reset_entry); to be sure debuggers/simulators properly set the stack
* `mem-e[35]1arty.ld`: fix RAM size, 16 KB
* `interrupts-handlers.c.cpp.liquid`: separate e31/e51; use the device specific interrupt name
* `oocd.launch.liquid`: update scripts names; remove coreplex, shorten hifive1
* initialize-hardware.c.cpp.liquid: fix PRCI inits
* led.c.cpp: fix gpio port usage
* liquid: deviceName e[35]1arty
* assets: os::sysclock, os_sysclock
* `include/*`: rename csr `set/clear_*_bits`
* `src/initialize*` interrupts-*: use prefixed CSRs
* move liquid below assets
* liquid/ldscripts/sections.ld: simplify; no separate local arch & device arrays
* update for `device-peripherals.h`; make `led-c.h` & `led-cpp.h` templates
* rename bin/xpm-init-sifive-project.js

### v0.0.14 (2017-10-05)

* main-liquid.c.cpp: remove c empty line

### v0.0.13 (2017-10-05)

* main-liquid.c.cpp: add 'using namespace os;'
* package-liquid.json: add script for 'clean'
* package.json: update GitHub links to -xpack

### v0.0.12 (2017-10-04)

* package-liquid.json: add devDependencies

### v0.0.11 (2017-10-04)

* remove shrinkwrap, recreate lock

### v0.0.10 (2017-10-04)

* `package.json` clean-ups
* add `CHANGELOG.md`

### v0.0.9, v0.0.8 (2017-09-20)

* README.md: document the project generation

### v0.0.7, v0.0.6, v0.0.5, v0.0.4 (2017-09-18)

* liquid: use '-%}'; rename LICENSE.liquid
* executable functional

### v0.0.3, v0.0.2 (2017-09-10)

* arty ram is 64K
* add java & scripts to make it executable (`xgen-sifive-coreplex-project`)

### v0.0.1 (2017-09-09)

* initial version, inspired from Eclipse templates.


