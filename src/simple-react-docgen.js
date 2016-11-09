#!/usr/bin/env node

import { parse, resolver } from 'react-docgen'
import Handlebars from 'handlebars'
import path from 'path'
import fs from 'fs'
import dir from 'node-dir'

// parse parameters with nomnom
const argv = require('nomnom')
  .script('simple-react-docgen')
  .help(
    'Create a markdown documentation from React components.\n' +
    'If a directory is passed, it is recursively traversed.'
  )
  .options({
    paths: {
      position: 0,
      help: 'Component files or directories. If nothing is provided it reads from stdin.',
      metavar: 'PATH',
      list: true,
      default: [],
    },
    extensions: {
      abbr: 'x',
      help: 'File extensions to consider. Repeat to define multiple extensions. Default:',
      list: true,
      default: ['js', 'jsx'],
    },
    excludePatterns: {
      abbr: 'e',
      full: 'exclude',
      help: 'Filename patterns to exclude. Default:',
      list: true,
      default: [],
    },
    ignoreDir: {
      abbr: 'i',
      full: 'ignore',
      help: 'Folders to ignore. Default:',
      list: true,
      default: ['node_modules', '__tests__'],
    }
  })
  .parse()

const template = Handlebars.compile(`${fs.readFileSync(path.join(__dirname, 'template.handlebars'))}`)
const templateData = { files: [] }

// when no paths
if ((argv.paths).length === 0) {
  writeDocFromStdin()
// when list of paths
} else {
  argv.paths.forEach((path) => {
    writeDocFromDirectory(path)
  })
}

/**
 * write documentation from a directory files
 */
function writeDocFromDirectory(directoryPath) {
  dir.readFiles(
    directoryPath,
    {
      match: new RegExp('\\.(?:' + argv.extensions.join('|') + ')$'),
      exclude: argv.excludePatterns,
      excludeDir: argv.ignoreDir,
    },
    function(error, content, filename, next) {
      if (error) { throw error }
      try {
        let components = parse(content, resolver.findAllExportedComponentDefinitions)
        templateData.files.push({ filename, components })
      } catch (e) {
        console.error(`Error from react-docgen at ${filename}:`)
        console.error(e)
      }
      next()
    },
    function(error) {
      if (error) { throw error }
      // write the template filled in
      process.stdout.write(template(templateData))
    }
  )
}

/**
 * write documentation from STDIN
 */
function writeDocFromStdin() {
  // ensure we are using utf8 encoding
  process.stdin.setEncoding('utf8')

  // timer to warn user we are waiting for stdin
  let timer = setTimeout(function() {
    console.error('Waiting for stdin, for usage try --help')
  }, 5000)

  // when data is beeing received
  let source = ''
  process.stdin.on('data', function (chunk) {
    clearTimeout(timer)
    source += chunk
  })

  // when all data is received
  process.stdin.on('end', function () {
    // catch possible errors beeing thrown from react-docgen
    try {
      let components = parse(source, resolver.findAllExportedComponentDefinitions)
      templateData.files.push({ components })
    } catch (e) {
      console.error('Error from react-docgen:')
      console.error(e)
    }

    // write the template filled in
    process.stdout.write(template(templateData))
  })
}
