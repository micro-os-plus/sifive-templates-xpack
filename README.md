## Templates to generate SiFive Core Complex projects

These are Liquid templates used to generate the projects for the SiFive Core Complex devices/boards.

## Developer info

This section is intended for developers who plan to use this package to create projects for SiFive Core Complex.

### Easy install

This package can be installed from the `npm` [registry](https://www.npmjs.com/package/@sifive/templates).

```console
$ xpm install @sifive/templates
```

This package is also available from [GitHub](https://github.com/micro-os-plus/sifive-templates-xpack):

```console
$ git clone https://github.com/micro-os-plus/sifive-templates-xpack.git sifive-templates-xpack.git
```

### Prerequisites

Installing from `npm` registry requires a recent [Node.js](https://nodejs.org) (>7.x; the 6.x LTS version is not compatible), and the `xpm` tool (https://www.npmjs.com/package/xpm).

```console
$ sudo npm install xpm --global
```

On Windows, global packages are installed in the user home folder, and do not require `sudo`.


## Command line usage

Instantiating the template will be done with a command like:

```console
$ xpm init --template @sifive/templates
...
```

For the moment this functionality is not yet available from `xpm`.

As a temporary solution, the package includes an experimental tool `xpm-init-sifive-project` that can be used in command line environments to create projects.

The tool should be started in an empty folder, where the project will be generated.

There are two modes, interactive and scriptable.

Starting the tool without any command line options will select the interactive mode, where the user can manually enter each choice.

```console
$ sudo npm install  @sifive/templates --global
$ mkdir -p /tmp/hifive1-blinky-cpp
$ cd /tmp/hifive1-blinky-cpp
$ xpm-init-sifive-project 
Generate a SiFive Core Complex C/C++ project

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

Creating the C++ project 'hifive1-blinky-cpp'...
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
Folder 'xpacks/sifive-devices' copied.

Done in 202 ms.
$ 
```

For scriptable uses, it is also possible to pass all required data on the command line. The only mandatory property is `boardName`, all other have defaults.

```console
$ cd /tmp/hifive1-blinky-cpp
$ xpm-init-sifive-project --property boardName=hifive1
Generate a SiFive Core Complex C/C++ project

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
Folder 'xpacks/sifive-devices' copied.

Done in 153 ms.
$
```

## Build

The generated projects include some additional metadata that can be used to automatically create a build configuration.

This metadata can be directly consumed by `xmake`, for example to generate `make` files. 

To run the build, be sure the `riscv64-unknown-elf` toolchain is in the path and `xmake` is installed globally (see [xmake](https://www.npmjs.com/package/xmake) for details).

```console
$ cd /tmp/hifive1-blinky-cpp
$ xmake build -v -- clean all
```

(for a less verbose output, remove `-v`).

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

The original content is released under the [MIT License](https://opensource.org/licenses/MIT), with all rights reserved to [Liviu Ionescu](https://github.com/ilg-ul).
