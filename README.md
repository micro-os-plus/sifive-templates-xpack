## Templates to generate SiFive Coreplex projects

These are Liquid templates used to generate the projects for the SiFive Coreplex devices/boards.

## Developer info

This section is intended for developers who plan to use this pacakge to create projects for SiFive Coreplex.

### Easy install

To be able to use the command line tool, this package can be installed globally from the `npm` registry.

On GNU/Linux and macOS this looks like (on Windows `sudo` is not necessary):

```bash
$ sudo npm install @sifive/coreplex-templates --global
```

This package is also available from [GitHub](https://github.com/micro-os-plus/sifive-coreplex-templates):

```bash
$ git clone https://github.com/micro-os-plus/sifive-coreplex-templates.git sifive-coreplex-templates.git
```

### Prerequisites

Installing from npm requires a recent [nodejs](https://nodejs.org) (>7.x) the 6.x LTS version is not compatible. 

## Command line usage

The package includes an experimental tool `xpm-init-sifive-coreplex-project` that can be used in command line environments to create projects.

The tool should be started in an empty folder, where the project will be generated.

There are two modes, interactive and scriptable.

Starting the tool without any command line options will select the interactive mode, where the user can manually enter each choice.

```bash
$ mkdir -p /tmp/hifive1-blinky
$ cd /tmp/hifive1-blinky
$ xpm-init-sifive-coreplex-project 
Generate a SiFive Coreplex C/C++ project

Programming language? (c, cpp, ?) [cpp]: 
Board? (hifive1, e31arty, e51arty, ?) [hifive1]: 
Content? (empty, blinky, ?) [blinky]: 
Use system calls? (none, retarget, ?) [retarget]: 
Trace output? (none, uart0ftdi, ?) [uart0ftdi]: 
Check some warnings? (true, false, ?) [true]: 
Check most warnings? (true, false, ?) [false]: 
Enable -Werror? (true, false, ?) [false]: 
Use -Og on debug? (true, false, ?) [false]: 
Use newlib nano? (true, false, ?) [true]: 

Creating the C++ project 'hifive1-blinky'...
File 'LICENSE' generated.
File 'oocd.launch' generated.
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' copied.
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
Folder 'xpacks/micro-os-plus-c-libs' copied.
Folder 'xpacks/micro-os-plus-cpp-libs' copied.
Folder 'xpacks/micro-os-plus-diag-trace' copied.
Folder 'xpacks/micro-os-plus-riscv-arch' copied.
Folder 'xpacks/micro-os-plus-startup' copied.
Folder 'xpacks/sifive-hifive1-board' copied.
Folder 'xpacks/sifive-coreplex-devices' copied.

Done in 202 ms.
$ 
```

For scriptable uses, it is also possible to pass all required data on the command line. The only mandatory property is `boardName`, all other have defaults.

```bash
$ cd /tmp/hifive1-blinky
$ xpm-init-sifive-coreplex-project --property boardName=hifive1
Generate a SiFive Coreplex C/C++ project

Creating the C++ project 'hifive1-blinky'...
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
File 'package.json' generated.
File 'README.md' generated.
File 'xmake.json' generated.
File 'include/led.h' copied.
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
Folder 'xpacks/micro-os-plus-c-libs' copied.
Folder 'xpacks/micro-os-plus-cpp-libs' copied.
Folder 'xpacks/micro-os-plus-diag-trace' copied.
Folder 'xpacks/micro-os-plus-riscv-arch' copied.
Folder 'xpacks/micro-os-plus-startup' copied.
Folder 'xpacks/sifive-hifive1-board' copied.
Folder 'xpacks/sifive-coreplex-devices' copied.

Done in 153 ms.
$
```

## Build

The generated projects include some additional metadata that can be used to automatically create a build configuration.

This metadata can be directly consumed by `xmake`, for example to generate `make` files. 

To run the build, be sure the `riscv64-unknown-elf` toolchain is in the path and `xmake` is installed globally.

```bash
$ cd /tmp/hifive1-blinky
$ xmake build -v -- clean all
```

(for a less verbose output, remove `-v`).

## License

The original content is released under the MIT License, with all rights reserved to Liviu Ionescu.
