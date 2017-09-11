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

const fs = require('fs')
// const path = require('path')

// https://www.npmjs.com/package/shopify-liquid
// const Liquid = require('liquidjs')

// const LiquidExtension = require('../utils/liquid-extensions.js')
//   .LiquidExtension

const Promisifier = require('@ilg/es6-promisifier').Promisifier

// ES6: `import { CliCommand, CliExitCodes, CliError, CliErrorApplication }
//   from 'cli-start-options'
const CliCommand = require('@ilg/cli-start-options').CliCommand
const CliExitCodes = require('@ilg/cli-start-options').CliExitCodes
// const CliError = require('@ilg/cli-start-options').CliError
// const CliErrorApplication = require('@ilg/cli-start-options')
//   .CliErrorApplication

// ----------------------------------------------------------------------------

// Promisify functions from the Node.js callbacks library.
// New functions have similar names, but suffixed with `Promise`.
Promisifier.promisifyInPlace(fs, 'readFile')
Promisifier.promisifyInPlace(fs, 'writeFile')
Promisifier.promisifyInPlace(fs, 'stat')
Promisifier.promisifyInPlace(fs, 'mkdir')

// Entered:
// fileExtension (c, cpp)
// content (empty, blinky)
// syscalls (none/retarget/semihosting)
// trace (NONE, UART0FTDI)
// boardName (hifive1, e31arty, e51arty)

// useSomeWarnings=true
// useMostWarnings=true
// useWerror=true
// useOg=true
// useNano=true

// Computed:
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

    // Defaults
    liquidMap['fileExtension'] = 'cpp'
    liquidMap['content'] = 'blinky'
    liquidMap['syscalls'] = 'retarget'
    liquidMap['trace'] = 'UART0FTDI'
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
        case 'fileExtension':
          if (arr[1] === 'c' || arr[1] === 'cpp') {
            liquidMap['fileExtension'] = arr[1]
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
          if (arr[1] === 'NONE' || arr[1] === 'UART0FTDI') {
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

    // ...

    const lang = liquidMap['fileExtension'] === 'cpp' ? 'C++' : 'C'
    log.info(`Creating the ${lang} project '${args[0]}'...`)

    this.outputDoneDuration()
    return CliExitCodes.SUCCESS
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
