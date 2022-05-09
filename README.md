[![npm (scoped)](https://img.shields.io/npm/v/@sifive/templates.svg)](https://www.npmjs.com/package/@sifive/templates)
[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/sifive/templates-xpack)](https://github.com/sifive/templates-xpack)
[![license](https://img.shields.io/github/license/micro-os-plus/sifive-templates-xpack.svg)](https://github.com/micro-os-plus/sifive-templates-xpack/blob/xpack/LICENSE)
[![CI on Push](https://github.com/micro-os-plus/sifive-templates-xpack/actions/workflows/CI.yml/badge.svg)](https://github.com/micro-os-plus/sifive-templates-xpack/actions/workflows/CI.yml)

## A source xPack with a template to generate SiFive Core Complex projects

These are the Liquid templates used to generate the projects for the
**SiFive Core Complex** devices/boards, like **HiFive1**, **Arty E31/E51**.

The package is both an xPack (used by `xpm`) and a Node.js module (for
running tests).

`@sifive/templates` is an open source project, hosted as
[micro-os-plus/sifive-templates-xpack](https://github.com/micro-os-plus/sifive-templates-xpack)
on GitHub.

## How to use

This section is intended for developers who plan to use this package to
create projects for SiFive Core Complex.

### Prerequisites

The only requirement is a recent
`xpm`, which is a portable
[Node.js](https://nodejs.org) command line application. To install it,
follow the instructions from the
[`xpm`](https://xpack.github.io/xpm/) page.

### Template instantiation

Instantiating the template can be done via the `xpm init` command,
pointing to this xPack:

```sh
mkdir -p my-project && cd my-project
xpm init --template @sifive/templates
```

This command must be invoked in an empty folder, where the project
will be generated.

There are two modes, interactive and non interactive (from a script).

Starting the tool without any command line options will select the
interactive mode and the user can manually enter each choice.

```console
$ rm -rf ~/tmp/hifive1-blinky-cpp
$ mkdir -p ~/tmp/hifive1-blinky-cpp && cd ~/tmp/hifive1-blinky-cpp
$ xpm init --template @sifive/templates

Checking package @sifive/templates@next metadata...
Processing @sifive/templates@1.2.10...

Programming language? (c, cpp, ?) [cpp]:
Board? (hifive1, e31arty, e51arty, ?) [hifive1]:
Content? (empty, blinky, ?) [blinky]:
Use system calls? (none, retarget, semihosting, ?) [retarget]:
Trace output? (none, uart0ftdi, stdout, debug, ?) [uart0ftdi]:
Check some warnings? (true, false, ?) [true]:
Check most warnings? (true, false, ?) [false]:
Enable -Werror? (true, false, ?) [false]:
Use -Og on debug? (true, false, ?) [false]:
Use newlib nano? (true, false, ?) [true]:
Creating the C++ project 'hifive1-blinky-cpp'...
File 'LICENSE' generated.
File 'oocd.launch' generated.
File 'jlink.launch' generated.
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' generated.
File 'include/sysclock.h' copied.
File 'ldscripts/libs.ld' copied.
File 'ldscripts/mem.ld' copied.
File 'ldscripts/sections.ld' copied.
File 'src/initialize-hardware.cpp' generated.
File 'src/interrupts-handlers.cpp' generated.
File 'src/led.cpp' copied.
File 'src/main.cpp' generated.
File 'src/newlib-syscalls.c' copied.
File 'src/sysclock.cpp' copied.
$
```

When used in scripts, it is possible to pass all required data on the
command line. The only mandatory property is `boardName`, all other
have defaults.

```console
$ rm -rf ~/tmp/hifive1-blinky-cpp
$ mkdir -p ~/tmp/hifive1-blinky-cpp && cd ~/tmp/hifive1-blinky-cpp
$ xpm init --template @sifive/templates --property boardName=hifive1

Checking package @sifive/templates@next metadata...
Processing @sifive/templates@1.2.10...

Creating the C++ project 'hifive1-blinky-cpp'...
- boardName=hifive1
- content=blinky
- syscalls=retarget
- trace=uart0ftdi
- useSomeWarnings=true
- useMostWarnings=false
- useWerror=false
- useOg=false
- useNano=true

File 'LICENSE' generated.
File 'oocd.launch' generated.
File 'jlink.launch' generated.
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' generated.
File 'include/sysclock.h' copied.
File 'ldscripts/libs.ld' copied.
File 'ldscripts/mem.ld' copied.
File 'ldscripts/sections.ld' copied.
File 'src/initialize-hardware.cpp' generated.
File 'src/interrupts-handlers.cpp' generated.
File 'src/led.cpp' copied.
File 'src/main.cpp' generated.
File 'src/newlib-syscalls.c' copied.
File 'src/sysclock.cpp' copied.
$
```

### Satisfy dependencies

The next step is to install all packages required, either source packages or
binary tools.

This is done by issuing the `xpm install` command in the project folder:

```console
$ cd ~/tmp/hifive1-blinky-cpp
$ xpm install
hifive1-blinky-cpp...
+ @micro-os-plus/diag-trace@1.0.7
+ @sifive/hifive1-board@1.0.4
+ @sifive/devices@1.0.3
+ @micro-os-plus/riscv-arch@1.0.3
+ @micro-os-plus/startup@1.0.8
+ @micro-os-plus/diag-trace@1.0.7
+ @micro-os-plus/cpp-libs@1.0.4
+ @micro-os-plus/c-libs@1.0.6
+ xmake@0.3.10 => 'node_modules/xmake'
+ @xpack-dev-tools/openocd@0.10.0-14.3
+ @xpack-dev-tools/riscv-none-embed-gcc@8.3.0-1.2.1
+ @xpack-dev-tools/windows-build-tools@2.12.2-2
'xpacks/micro-os-plus-diag-trace' -> '/Users/ilg/Library/xPacks/@micro-os-plus/diag-trace/1.0.7'
'xpacks/sifive-devices' -> '/Users/ilg/Library/xPacks/@sifive/devices/1.0.3'
'xpacks/micro-os-plus-startup' -> '/Users/ilg/Library/xPacks/@micro-os-plus/startup/1.0.8'
'xpacks/micro-os-plus-riscv-arch' -> '/Users/ilg/Library/xPacks/@micro-os-plus/riscv-arch/1.0.3'
'xpacks/sifive-hifive1-board' -> '/Users/ilg/Library/xPacks/@sifive/hifive1-board/1.0.4'
'xpacks/xpack-dev-tools-openocd' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/openocd/0.10.0-14.3'
'xpacks/micro-os-plus-cpp-libs' -> '/Users/ilg/Library/xPacks/@micro-os-plus/cpp-libs/1.0.4'
'xpacks/micro-os-plus-c-libs' -> '/Users/ilg/Library/xPacks/@micro-os-plus/c-libs/1.0.6'
'xpacks/xpack-dev-tools-riscv-none-embed-gcc' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/riscv-none-embed-gcc/8.3.0-1.2.1'
'xpacks/xpack-dev-tools-windows-build-tools' -> '/Users/ilg/Library/xPacks/@xpack-dev-tools/windows-build-tools/2.12.2-2'
'xpacks/.bin/openocd' -> '../xpack-dev-tools-openocd/.content/bin/openocd'
'xpacks/.bin/riscv-none-embed-addr2line' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-addr2line'
'xpacks/.bin/riscv-none-embed-ar' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-ar'
'xpacks/.bin/riscv-none-embed-as' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-as'
'xpacks/.bin/riscv-none-embed-c++' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-c++'
'xpacks/.bin/riscv-none-embed-c++filt' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-c++filt'
'xpacks/.bin/riscv-none-embed-cpp' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-cpp'
'xpacks/.bin/riscv-none-embed-elfedit' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-elfedit'
'xpacks/.bin/riscv-none-embed-g++' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-g++'
'xpacks/.bin/riscv-none-embed-gcc' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcc'
'xpacks/.bin/riscv-none-embed-gcc-ar' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcc-ar'
'xpacks/.bin/riscv-none-embed-gcc-nm' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcc-nm'
'xpacks/.bin/riscv-none-embed-gcc-ranlib' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcc-ranlib'
'xpacks/.bin/riscv-none-embed-gcov' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcov'
'xpacks/.bin/riscv-none-embed-gcov-dump' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcov-dump'
'xpacks/.bin/riscv-none-embed-gcov-tool' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gcov-tool'
'xpacks/.bin/riscv-none-embed-gdb' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gdb'
'xpacks/.bin/riscv-none-embed-gdb-add-index' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gdb-add-index'
'xpacks/.bin/riscv-none-embed-gprof' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-gprof'
'xpacks/.bin/riscv-none-embed-ld' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-ld'
'xpacks/.bin/riscv-none-embed-ld.bfd' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-ld.bfd'
'xpacks/.bin/riscv-none-embed-nm' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-nm'
'xpacks/.bin/riscv-none-embed-objcopy' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-objcopy'
'xpacks/.bin/riscv-none-embed-objdump' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-objdump'
'xpacks/.bin/riscv-none-embed-ranlib' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-ranlib'
'xpacks/.bin/riscv-none-embed-readelf' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-readelf'
'xpacks/.bin/riscv-none-embed-size' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-size'
'xpacks/.bin/riscv-none-embed-strings' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-strings'
'xpacks/.bin/riscv-none-embed-strip' -> '../xpack-dev-tools-riscv-none-embed-gcc/.content/bin/riscv-none-embed-strip'
$
```

### Build

The generated projects include some additional metadata that can be used
to automatically create a build configuration.

For example, this metadata can be directly consumed by
[`xmake`](https://www.npmjs.com/package/xmake), to
generate `make` files.

Based on the xPack `devDependencies`, the toolchain and all other tools
are automatically installed and
their locations are automatically added to the internal path, so
none of the tools need to be in the global path.

```console
$ cd ~/tmp/hifive1-blinky-cpp
$ xpm run build
```

## Developer info

### The xPack git repo

```console
$ git clone https://github.com/micro-os-plus/sifive-templates-xpack.git sifive-templates-xpack.git
$ cd sifive-templates-xpack.git
$ npm install
```

### Tests

Given the large number of configuration properties, there may be
more than 200 different projects.

The tests address generating and building either a selection of
these projects, or all of them.

As for any `npm` package, the standard way to run the project tests is
via `npm run test`:

```console
$ cd sifive-templates-xpack.git
$ npm install
$ npm run test
```

To test all possible combinations, use `test-all`:

```console
$ npm run test-all
```

A typical test result looks like:

```console
$ npm run test
> @sifive/templates@1.1.0 test /Users/ilg/My Files/MacBookPro Projects/uOS/xpacks/sifive-templates-xpack.git
> ./test/test.js

Testing selected cases...

Testing '001-hifive1-blinky-retarget-uart0ftdi-c'...
Generate a SiFive Core Complex C/C++ project


Creating the C project '001-hifive1-blinky-retarget-uart0ftdi-c'...
- boardName=hifive1
- content=blinky
- syscalls=retarget
- trace=uart0ftdi
- useSomeWarnings=true
- useMostWarnings=true
- useWerror=true
- useOg=false
- useNano=true

File 'LICENSE' generated.
File 'oocd.launch' generated.
File 'jlink.launch' generated.
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' generated.
File 'include/sysclock.h' copied.
File 'ldscripts/libs.ld' copied.
File 'ldscripts/mem.ld' copied.
File 'ldscripts/sections.ld' copied.
File 'src/initialize-hardware.c' generated.
File 'src/interrupts-handlers.c' generated.
File 'src/led.c' copied.
File 'src/main.c' generated.
File 'src/newlib-syscalls.c' copied.
File 'src/sysclock.c' copied.

'xpm-init-sifive-project' completed in 77 ms.
xPack manager - install package(s)

Installing dependencies for '001-hifive1-blinky-retarget-uart0ftdi-c'...
Checking '@micro-os-plus/diag-trace@1.0.6'...
Checking '@sifive/hifive1-board@1.0.3'...
Checking '@sifive/devices@1.0.2'...
Checking '@micro-os-plus/riscv-arch@1.0.2'...
Checking '@micro-os-plus/startup@1.0.7'...
Checking '@micro-os-plus/diag-trace@1.0.6'...
Checking '@micro-os-plus/c-libs@1.0.6'...
Checking '@micro-os-plus/cpp-libs@1.0.4'...
Checking 'xmake@0.3.9'...
Checking '@gnu-mcu-eclipse/riscv-none-gcc@7.2.0-2.1'...
Checking '@gnu-mcu-eclipse/openocd@0.10.0-7.1'...
Checking '@gnu-mcu-eclipse/windows-build-tools@2.10.1'...

Folder 'micro-os-plus-diag-trace' linked to '@micro-os-plus/diag-trace/1.0.6'.
Folder 'sifive-hifive1-board' linked to '@sifive/hifive1-board/1.0.3'.
Folder 'sifive-devices' linked to '@sifive/devices/1.0.2'.
Folder 'micro-os-plus-riscv-arch' linked to '@micro-os-plus/riscv-arch/1.0.2'.
Folder 'micro-os-plus-startup' linked to '@micro-os-plus/startup/1.0.7'.
Folder 'micro-os-plus-c-libs' linked to '@micro-os-plus/c-libs/1.0.6'.
Folder 'micro-os-plus-cpp-libs' linked to '@micro-os-plus/cpp-libs/1.0.4'.
Folder 'xmake' linked to 'xmake/0.3.9'.
File 'xmake' linked to 'xmake/bin/xmake.js'
Folder 'gnu-mcu-eclipse-riscv-none-gcc' linked to '@gnu-mcu-eclipse/riscv-none-gcc/7.2.0-2.1'.
File 'riscv-none-embed-addr2line' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-addr2line'
File 'riscv-none-embed-ar' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-ar'
File 'riscv-none-embed-as' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-as'
File 'riscv-none-embed-c++' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-c++'
File 'riscv-none-embed-c++filt' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-c++filt'
File 'riscv-none-embed-cpp' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-cpp'
File 'riscv-none-embed-elfedit' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-elfedit'
File 'riscv-none-embed-g++' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-g++'
File 'riscv-none-embed-gcc' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcc'
File 'riscv-none-embed-gcc-7.2.0' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcc-7.2.0'
File 'riscv-none-embed-gcc-ar' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcc-ar'
File 'riscv-none-embed-gcc-nm' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcc-nm'
File 'riscv-none-embed-gcc-ranlib' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcc-ranlib'
File 'riscv-none-embed-gcov' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcov'
File 'riscv-none-embed-gcov-dump' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcov-dump'
File 'riscv-none-embed-gcov-tool' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gcov-tool'
File 'riscv-none-embed-gdb' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gdb'
File 'riscv-none-embed-gprof' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-gprof'
File 'riscv-none-embed-ld' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-ld'
File 'riscv-none-embed-ld.bfd' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-ld.bfd'
File 'riscv-none-embed-nm' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-nm'
File 'riscv-none-embed-objcopy' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-objcopy'
File 'riscv-none-embed-objdump' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-objdump'
File 'riscv-none-embed-ranlib' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-ranlib'
File 'riscv-none-embed-readelf' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-readelf'
File 'riscv-none-embed-run' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-run'
File 'riscv-none-embed-size' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-size'
File 'riscv-none-embed-strings' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-strings'
File 'riscv-none-embed-strip' linked to 'gnu-mcu-eclipse-riscv-none-gcc/.content/bin/riscv-none-embed-strip'
Folder 'gnu-mcu-eclipse-openocd' linked to '@gnu-mcu-eclipse/openocd/0.10.0-7.1'.
File 'openocd' linked to 'gnu-mcu-eclipse-openocd/.content/bin/openocd'
Folder 'gnu-mcu-eclipse-windows-build-tools' linked to '@gnu-mcu-eclipse/windows-build-tools/2.10.1'.

'xpm install' completed in 7.062 sec.
xPack manager - run package specific script

Changing current folder to '/private/var/folders/n7/kxqjc5zs4qs0nb44v1l2r2j00000gn/T/sifive-templates/001-hifive1-blinky-retarget-uart0ftdi-c'...
Invoking 'xmake build -- all'...

xmake - build project configuration(s)

Generating the build files for '001-hifive1-blinky-retarget-uart0ftdi-c', target 'hifive1', toolchain 'riscv-none-gcc', profile 'debug'...
Generating 'make' files...
'make' files generated in 81 ms.

Changing current folder to 'build/001-hifive1-blinky-retarget-uart0ftdi-c-hifive1-riscv-none-gcc-debug'...

Invoking builder: 'make all'...
[riscv-none-embed-gcc]: src/initialize-hardware.c
[riscv-none-embed-gcc]: src/interrupts-handlers.c
[riscv-none-embed-gcc]: src/led.c
[riscv-none-embed-gcc]: src/main.c
[riscv-none-embed-gcc]: src/newlib-syscalls.c
[riscv-none-embed-gcc]: src/sysclock.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/_sbrk.c
[riscv-none-embed-g++]: xpacks/micro-os-plus-c-libs/src/c-syscalls-empty.cpp
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/assert.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/exit.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/init-fini.c
[riscv-none-embed-g++]: xpacks/micro-os-plus-c-libs/src/stdlib/atexit.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-cpp-libs/src/cxx.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-diag-trace/src/trace.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-riscv-arch/src/arch-functions.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-riscv-arch/src/traps.cpp
[riscv-none-embed-gcc]: xpacks/micro-os-plus-riscv-arch/src/reset-entry.S
[riscv-none-embed-gcc]: xpacks/micro-os-plus-riscv-arch/src/trap-entry.S
[riscv-none-embed-g++]: xpacks/micro-os-plus-startup/src/startup.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/device-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/plic-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/arty/e31/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/arty/e51/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/fe310/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-hifive1-board/src/board-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-hifive1-board/src/trace-uart.cpp
[riscv-none-embed-g++]: 001-hifive1-blinky-retarget-uart0ftdi-c.elf
'make all' completed in 5.894 sec.

Generating the build files for '001-hifive1-blinky-retarget-uart0ftdi-c', target 'hifive1', toolchain 'riscv-none-gcc', profile 'release'...
Generating 'make' files...
'make' files generated in 80 ms.

Changing current folder to 'build/001-hifive1-blinky-retarget-uart0ftdi-c-hifive1-riscv-none-gcc-release'...

Invoking builder: 'make all'...
[riscv-none-embed-gcc]: src/initialize-hardware.c
[riscv-none-embed-gcc]: src/interrupts-handlers.c
[riscv-none-embed-gcc]: src/led.c
[riscv-none-embed-gcc]: src/main.c
[riscv-none-embed-gcc]: src/newlib-syscalls.c
[riscv-none-embed-gcc]: src/sysclock.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/_sbrk.c
[riscv-none-embed-g++]: xpacks/micro-os-plus-c-libs/src/c-syscalls-empty.cpp
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/assert.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/exit.c
[riscv-none-embed-gcc]: xpacks/micro-os-plus-c-libs/src/stdlib/init-fini.c
[riscv-none-embed-g++]: xpacks/micro-os-plus-c-libs/src/stdlib/atexit.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-cpp-libs/src/cxx.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-diag-trace/src/trace.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-riscv-arch/src/arch-functions.cpp
[riscv-none-embed-g++]: xpacks/micro-os-plus-riscv-arch/src/traps.cpp
[riscv-none-embed-gcc]: xpacks/micro-os-plus-riscv-arch/src/reset-entry.S
[riscv-none-embed-gcc]: xpacks/micro-os-plus-riscv-arch/src/trap-entry.S
[riscv-none-embed-g++]: xpacks/micro-os-plus-startup/src/startup.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/device-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/plic-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/arty/e31/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/arty/e51/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-devices/src/fe310/device-interrupts.cpp
[riscv-none-embed-g++]: xpacks/sifive-hifive1-board/src/board-functions.cpp
[riscv-none-embed-g++]: xpacks/sifive-hifive1-board/src/trace-uart.cpp
[riscv-none-embed-g++]: 001-hifive1-blinky-retarget-uart0ftdi-c.elf
'make all' completed in 5.400 sec.

'xmake build' completed in 11.528 sec.

'xpm run build' completed in 12.261 sec.

Testing '002-hifive1-blinky-retarget-uart0ftdi-cpp'...
Generate a SiFive Core Complex C/C++ project


Creating the C++ project '002-hifive1-blinky-retarget-uart0ftdi-cpp'...
- boardName=hifive1
- content=blinky
- syscalls=retarget
- trace=uart0ftdi
- useSomeWarnings=true
- useMostWarnings=true
- useWerror=true
- useOg=false
- useNano=true

File 'LICENSE' generated.
File 'oocd.launch' generated.
File 'jlink.launch' generated.
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' generated.
File 'include/sysclock.h' copied.
File 'ldscripts/libs.ld' copied.
File 'ldscripts/mem.ld' copied.
File 'ldscripts/sections.ld' copied.
File 'src/initialize-hardware.cpp' generated.
File 'src/interrupts-handlers.cpp' generated.
File 'src/led.cpp' copied.
File 'src/main.cpp' generated.
File 'src/newlib-syscalls.c' copied.
File 'src/sysclock.cpp' copied.

'xpm-init-sifive-project' completed in 77 ms.
...
```

### Coverage tests

- none so far.

### Continuous Integration (CI)

The continuous integration tests are performed via
[Travis CI](https://travis-ci.org/micro-os-plus/sifive-templates-xpack).

### Standard compliance

The module uses ECMAScript 6 class definitions.

As style, it uses the [JavaScript Standard Style](https://standardjs.com/),
automatically checked at each commit via Travis CI.

Known and accepted exceptions:

- none.

To manually fix compliance with the style guide (where possible):

```console
$ npm run fix

> @sifive/templates@1.1.0 fix /Users/ilg/My Files/MacBookPro Projects/uOS/xpacks/sifive-templates-xpack.git
> standard --fix
$
```

### Documentation metadata

The documentation metadata follows the [JSdoc](http://usejsdoc.org) tags.

To enforce checking at file level, add the following comments right after
the `use strict`:

```js
'use strict'
/* eslint valid-jsdoc: "error" */
/* eslint max-len: [ "error", 80, { "ignoreUrls": true } ] */
```

Note: be sure C style comments are used, C++ styles are not parsed by
[ESLint](http://eslint.org).

## Maintainer info

### How to publish

To check the last commits:

```console
$ git log --pretty='%cd * %h %s' --date=short
```

- commit all changes
- update `CHANGELOG.md`; commit with a message like _CHANGELOG: prepare v0.1.2_
- `npm version patch`
- push all changes to GitHub
- `npm publish`

## License

The original content is released under the
[MIT License](https://opensource.org/licenses/MIT), with all rights
reserved to [Liviu Ionescu](https://github.com/ilg-ul).
