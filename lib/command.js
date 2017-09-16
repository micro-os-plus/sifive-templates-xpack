/*
 * This file is part of the µOS++ distribution.
 *   (https://github.com/micro-os-plus)
 * Copyright (c) 2017 Liviu Ionescu.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict'
/* eslint valid-jsdoc: "error" */
/* eslint max-len: [ "error", 80, { "ignoreUrls": true } ] */

// ----------------------------------------------------------------------------

/**
 * The `xgen-sifive-coreplex-project ...` command implementation.
 */

// ----------------------------------------------------------------------------

const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const process = require('process')

// https://www.npmjs.com/package/shopify-liquid
const Liquid = require('liquidjs')

// const LiquidExtension = require('../utils/liquid-extensions.js')
//   .LiquidExtension

const Promisifier = require('@ilg/es6-promisifier').Promisifier

// ES6: `import { CliCommand, CliExitCodes, CliError, CliErrorApplication }
//   from 'cli-start-options'
const CliCommand = require('@ilg/cli-start-options').CliCommand
const CliExitCodes = require('@ilg/cli-start-options').CliExitCodes
const CliError = require('@ilg/cli-start-options').CliError
// const CliErrorApplication = require('@ilg/cli-start-options')
//   .CliErrorApplication

// ----------------------------------------------------------------------------

// Promisify functions from the Node.js callbacks library.
// New functions have similar names, but suffixed with `Promise`.
// Promisifier.promisifyInPlace(fs, 'readFile')
Promisifier.promisifyInPlace(fs, 'writeFile')
// Promisifier.promisifyInPlace(fs, 'stat')
// Promisifier.promisifyInPlace(fs, 'mkdir')

// ----------------------------------------------------------------------------

// Provided:
// language (c, cpp)
// content (empty, blinky)
// syscalls (none/retarget/semihosting)
// trace (none, uart0ftdi)
// boardName (hifive1, e31arty, e51arty)

// useSomeWarnings=true
// useMostWarnings=true
// useWerror=true
// useOg=true
// useNano=true

// Computed:
// fileExtension (c, cpp)
// deviceName (fe310, e31, e51)
// deviceMacro <string>
// boardMacro <string>
// boardFolder  <string>
// boardDescription  <string>

// ============================================================================

// export
class Command extends CliCommand {
  // --------------------------------------------------------------------------

  /**
   * @summary Constructor, to set help definitions.
   *
   * @param {Object} context Reference to a context.
   */
  constructor (context) {
    super(context)

    // Title displayed with the help message.
    this.title = 'Generate a SiFive Coreplex C/C++ project'
    this.optionGroups = [
      {
        title: 'Command options',
        msg: '<project name>',
        optionDefs: [
          {
            options: ['-c', '--config'],
            action: (context, val) => {
              context.config.configVariables.push(val)
            },
            init: (context) => {
              context.config.configVariables = []
            },
            msg: 'Configuration variables',
            param: 'string',
            isOptional: true
          }
        ]
      }
    ]
  }

  /**
   * @summary Execute the `code` command.
   *
   * @param {string[]} args Command line arguments.
   * @returns {number} Return code.
   *
   * @override
   */
  async doRun (args) {
    const log = this.log
    log.trace(`${this.constructor.name}.doRun()`)

    log.info(this.title)
    log.info()

    const context = this.context
    const config = context.config

    if (args.length === 0) {
      // TODO: enter interactive mode.
      log.error('Missing project name.')
      this.help()
      return CliExitCodes.ERROR.SYNTAX // No project name.
    }

    // At this point context.config.configVariables might have some data.
    const liquidMap = {}

    // Validate args[0] as project name
    if (args[0].match(/[^a-zA-Z0-9-]/)) {
      log.error(`Project name '${args[0]}' ` +
        'may contain only letters, digits and hyphens.')
      return CliExitCodes.ERROR.SYNTAX
    }

    liquidMap['projectName'] = args[0]

    // Defaults
    liquidMap['language'] = 'cpp'

    liquidMap['content'] = 'blinky'
    liquidMap['syscalls'] = 'retarget'
    liquidMap['trace'] = 'uart0ftdi'
    liquidMap['boardName'] = 'hifive1'

    liquidMap['useSomeWarnings'] = true
    liquidMap['useMostWarnings'] = true
    liquidMap['useWerror'] = false
    liquidMap['useOg'] = false
    liquidMap['useNano'] = true

    let isError = false
    for (const variable of config.configVariables) {
      // Split name=value
      const arr = variable.split('=', 2)
      if (arr.length === 1) {
        arr[1] = 'true' // Mandatory a string, it is tested with '==='
      }

      switch (arr[0]) {
        case 'language':
          if (arr[1] === 'c') {
            liquidMap['language'] = 'c'
          } else if (arr[1] === 'c++') {
            liquidMap['language'] = 'cpp'
          } else {
            log.error(`Unsupported '${variable}'.`)
            isError = true
          }
          break

        case 'content':
          if (arr[1] === 'empty' || arr[1] === 'blinky') {
            liquidMap['content'] = arr[1]
          } else {
            log.error(`Unsupported '${variable}'.`)
            isError = true
          }
          break

        case 'syscalls':
          if (arr[1] === 'none' || arr[1] === 'retarget' ||
                  arr[1] === 'semihosting') {
            liquidMap['syscalls'] = arr[1]
          } else {
            log.error(`Unsupported '${variable}'.`)
            isError = true
          }
          break

        case 'trace':
          if (arr[1] === 'none' || arr[1] === 'uart0ftdi') {
            liquidMap['trace'] = arr[1]
          } else {
            log.error(`Unsupported '${variable}'.`)
            isError = true
          }
          break

        case 'boardName':
          liquidMap['boardName'] = arr[1]
          break

        case 'useSomeWarnings':
          liquidMap['useSomeWarnings'] = (arr[1] === 'true')
          break

        case 'useMostWarnings':
          liquidMap['useMostWarnings'] = (arr[1] === 'true')
          break

        case 'useWerror':
          liquidMap['useWerror'] = (arr[1] === 'true')
          break

        case 'useOg':
          liquidMap['useOg'] = (arr[1] === 'true')
          break

        case 'useNano':
          liquidMap['useNano'] = (arr[1] === 'true')
          break

        default:
          log.error(`Unsupported configuration variable '${arr[0]}'.`)
          isError = true
          break
      }
    }
    if (isError) {
      return CliExitCodes.ERROR
    }

    switch (liquidMap['boardName']) {
      case 'hifive1':
        liquidMap['deviceName'] = 'fe310'
        liquidMap['deviceMacro'] = 'SIFIVE_FREEDOM_E310'
        liquidMap['boardMacro'] = 'SIFIVE_HIFIVE1_BOARD'
        liquidMap['boardFolder'] = 'sifive-hifive1-board'
        liquidMap['boardDescription'] = 'Freedom E310 HiFive1'
        break

      case 'e31arty':
        liquidMap['deviceName'] = 'e31'
        liquidMap['deviceMacro'] = 'SIFIVE_COREPLEX_31'
        liquidMap['boardMacro'] = 'SIFIVE_COREPLEX_31_ARTY_BOARD'
        liquidMap['boardFolder'] = 'sifive-coreplex-arty-boards'
        liquidMap['boardDescription'] = 'Coreplex IP E31 Arty'
        break

      case 'e51arty':
        liquidMap['deviceName'] = 'e51'
        liquidMap['deviceMacro'] = 'SIFIVE_COREPLEX_51'
        liquidMap['boardMacro'] = 'SIFIVE_COREPLEX_51_ARTY_BOARD'
        liquidMap['boardFolder'] = 'sifive-coreplex-arty-boards'
        liquidMap['boardDescription'] = 'Coreplex IP E51 Arty'
        break

      default:
        log.error(`Unsupported board '${liquidMap['boardName']}'.`)
        isError = true
        break
    }

    liquidMap['fileExtension'] = liquidMap['language']
    
    liquidMap['year'] = '2017'
    liquidMap['authorName'] = '<your-name-here>'

    this.liquidMap = liquidMap
    await this.generate()

    this.outputDoneDuration()
    return CliExitCodes.SUCCESS
  }

  async render (inputFileRelativePath, outputFileRelativePath, map) {
    const log = this.log

    const vh = await this.engine.renderFile(inputFileRelativePath, map)

    // const headerPath = path.resolve(codePath, `${pnam}.h`)
    try {
      await fs.writeFilePromise(outputFileRelativePath, vh, 'utf8')
    } catch (err) {
      throw new CliError(err.message, CliExitCodes.ERROR.OUTPUT)
    }
    log.info(`File '${outputFileRelativePath}' generated.`)
  }

  copyPackage (scope, name) {
    const log = this.log
    const context = this.context

    const modulesPath = path.resolve(context.rootPath, 'node_modules')

    shell.mkdir('-p', `xpacks/${scope}-${name}`)
    shell.cp('-R', path.resolve(modulesPath, `@${scope}`, `${name}`, '*'),
      `xpacks/${scope}-${name}`)
    log.info(`Folder 'xpacks/${scope}-${name}' copied.`)
  }

  async generate () {
    const log = this.log
    const context = this.context

    const args = this.commandArgs
    const liquidMap = this.liquidMap

    const lang = (liquidMap['language'] === 'cpp') ? 'C++' : 'C'
    log.info(`Creating the ${lang} project '${args[0]}'...`)

    log.info(`- boardName='${liquidMap['boardName']}'`)
    log.info(`- content='${liquidMap['content']}'`)
    log.info(`- syscalls='${liquidMap['syscalls']}'`)
    log.info(`- trace='${liquidMap['trace']}'`)
    log.info(`- useSomeWarnings='${liquidMap['useSomeWarnings']}'`)
    log.info(`- useMostWarnings='${liquidMap['useMostWarnings']}'`)
    log.info(`- useWerror='${liquidMap['useWerror']}'`)
    log.info(`- useOg='${liquidMap['useOg']}'`)
    log.info(`- useNano='${liquidMap['useNano']}'`)
    log.info()

    const projectPath = this.makePathAbsolute(args[0])
    // Create the project folder.
    shell.mkdir('-p', projectPath)

    process.chdir(projectPath)
    log.debug(`cwd()='${process.cwd()}'`)

    const from = path.resolve(context.rootPath, 'liquid')
    log.debug(`from='${from}'`)

    const templatesPath = path.resolve(context.rootPath, 'liquid')
    this.engine = Liquid({
      root: templatesPath,
      cache: false,
      strict_filters: true,       // default: false
      strict_variables: true,     // default: false
      trim_right: false,          // default: false
      trim_left: false            // default: false
    })

    const fileExtension = liquidMap['fileExtension']
    const boardName = liquidMap['boardName']

    // ------------------------------------------------------------------------
    // Generate the application files.

    await this.render('LICENSE.liquid', 'LICENSE', liquidMap)
    await this.render('oocd-liquid.launch', 'oocd.launch', liquidMap)
    await this.render('package-liquid.json', 'package.json', liquidMap)
    await this.render('README-liquid.md', 'README.md', liquidMap)

    shell.mkdir('-p', 'include')
    shell.cp(path.resolve(templatesPath, `include/led-${fileExtension}.h`),
      'include/led.h')
    log.info(`File 'include/led.h' copied.`)
    shell.cp(path.resolve(templatesPath, `include/sysclock-${fileExtension}.h`),
      'include/sysclock.h')
    log.info(`File 'include/sysclock.h' copied.`)

    shell.mkdir('-p', 'ldscripts')
    shell.cp(path.resolve(templatesPath, 'ldscripts/libs.ld'),
      'ldscripts/libs.ld')
    log.info(`File 'ldscripts/libs.ld' copied.`)
    shell.cp(path.resolve(templatesPath, `ldscripts/mem-${boardName}.ld`),
      'ldscripts/mem.ld')
    log.info(`File 'ldscripts/mem.ld' copied.`)
    shell.cp(path.resolve(templatesPath, 'ldscripts/sections.ld'),
      'ldscripts/sections.ld')
    log.info(`File 'ldscripts/sections.ld' copied.`)

    shell.mkdir('-p', 'src')
    await this.render('src/initialize-hardware-liquid.c.cpp',
      `src/initialize-hardware.${fileExtension}`, liquidMap)
    await this.render('src/interrupts-handlers-liquid.c.cpp',
      `src/interrupts-handlers.${fileExtension}`, liquidMap)

    shell.cp(path.resolve(templatesPath, `src/led.${fileExtension}`),
      `src/led.${fileExtension}`)
    log.info(`File 'src/led.${fileExtension}' copied.`)

    await this.render('src/main-liquid.c.cpp',
      `src/main.${fileExtension}`, liquidMap)

    shell.cp(path.resolve(templatesPath, 'src/newlib-syscalls.c'),
      'src/newlib-syscalls.c')
    log.info(`File 'src/newlib-syscalls.c' copied.`)

    shell.cp(path.resolve(templatesPath, `src/sysclock.${fileExtension}`),
      `src/sysclock.${fileExtension}`)
    log.info(`File 'src/sysclock.${fileExtension}' copied.`)

    // ------------------------------------------------------------------------
    // Copy dependencies.
    // TODO: remove when `xpm` will be able to do this automatically.

    this.copyPackage('micro-os-plus', 'c-libs')
    this.copyPackage('micro-os-plus', 'cpp-libs')
    this.copyPackage('micro-os-plus', 'diag-trace')
    this.copyPackage('micro-os-plus', 'riscv-arch')
    this.copyPackage('micro-os-plus', 'startup')

    if (boardName === 'e31arty' || boardName === 'e51arty') {
      this.copyPackage('sifive', 'coreplex-arty-boards')
    } else if (boardName === 'hifive1') {
      this.copyPackage('sifive', 'hifive1-board')
    }
    this.copyPackage('sifive', 'coreplex-devices')
  }
}

// ----------------------------------------------------------------------------
// Node.js specific export definitions.

// By default, `module.exports = {}`.
// The Code class is added as a property of this object.
module.exports.Command = Command

// In ES6, it would be:
// export class Command { ... }
// ...
// import { Command } from 'command.js'

// ----------------------------------------------------------------------------
