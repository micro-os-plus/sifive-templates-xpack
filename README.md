## Templates to generate SiFive Core Complex projects

These are Liquid templates used to generate the projects for the SiFive 
Core Complex devices/boards.

## Developer info

This section is intended for developers who plan to use this package to 
create projects for SiFive Core Complex.

### Prerequisites

A recent [`xpm`](https://www.npmjs.com/package/xpm), which is a portable [Node.js](https://nodejs.org/) command line application.

### How to use

Instantiating the template can be done via he `xpm init` command like:

```console
$ xpm init --template @sifive/templates
...
```

The command must be invoked in an empty folder, where the project 
will be generated.

There are two modes, interactive and from a script.

Starting the tool without any command line options will select the
interactive mode, where the user can manually enter each choice.

```console
$ mkdir -p /tmp/hifive1-blinky-cpp
$ cd /tmp/hifive1-blinky-cpp
$ xpm init --template @sifive/templates 
xPack manager - create an xPack, possibly from a template

Processing @sifive/templates@1.0.4...

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

Creating the C++ project 'xp'...
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

'xpm init' completed in 77 ms.
$ 
```

For scriptable uses, it is possible to pass all required data on the 
command line. The only mandatory property is `boardName`, all other 
have defaults.

```console
$ cd /tmp/hifive1-blinky-cpp
$ xpm init --template @sifive/templates --property boardName=hifive1
xPack manager - create an xPack, possibly from a template

Processing @sifive/templates@1.0.4...

Creating the C++ project 'xp'...
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

'xpm init' completed in 1.144 sec.
$
```

### Satisfy dependencies

The next step is to install all packages required, either source packages or 
binary tools.

This is done by issuing the `xpm install` command in the project folder:

```console
$ cd /tmp/hifive1-blinky-cpp
$ xpm install
xPack manager - install package(s)

Installing dependencies for 'hifive1-blinky-cpp'...
Folder 'micro-os-plus-diag-trace' linked to '@micro-os-plus/diag-trace/1.0.6'.
Folder 'sifive-hifive1-board' linked to '@sifive/hifive1-board/1.0.3'.
Folder 'sifive-devices' linked to '@sifive/devices/1.0.2'.
Folder 'micro-os-plus-riscv-arch' linked to '@micro-os-plus/riscv-arch/1.0.2'.
Folder 'micro-os-plus-startup' linked to '@micro-os-plus/startup/1.0.7'.
Folder 'micro-os-plus-c-libs' linked to '@micro-os-plus/c-libs/1.0.6'.
Folder 'micro-os-plus-cpp-libs' linked to '@micro-os-plus/cpp-libs/1.0.4'.
Folder 'xmake' linked to 'xmake/0.3.8'.
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

'xpm install' completed in 6.086 sec.
$
```

### Build

The generated projects include some additional metadata that can be used 
to automatically create a build configuration.

This metadata can be directly consumed by 
[`xmake`](https://www.npmjs.com/package/xmake), for example to 
generate `make` files. 

The toolchain and all other tools are automatically installed and 
their locations are automatically added to the internal path, so do
not need to be in the global path. 

```console
$ cd /tmp/hifive1-blinky-cpp
$ xpm run build
```


## Maintainer info

### How to publish

To check the last commits:

```console
$ git log --pretty='%cd * %h %s' --date=short
```

* commit all changes
* update `CHANGELOG.md`; commit with a message like _CHANGELOG: prepare v0.1.2_
* `npm version patch`
* push all changes to GitHub
* `npm publish`

## License

The original content is released under the 
[MIT License](https://opensource.org/licenses/MIT), with all rights reserved to
[Liviu Ionescu](https://github.com/ilg-ul).
