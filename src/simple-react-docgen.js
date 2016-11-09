#!/usr/bin/env node

import { parse, resolver } from 'react-docgen'
import Handlebars from 'handlebars'
import path from 'path'
import fs from 'fs'

// parse parameters with nomnom
const argv = require('nomnom')
  .script('simple-react-docgen')
  .help(
    'Create a markdown documentation from React components.\n' +
    'If a directory is passed, it is recursively traversed.'
  )
  .options({
    path: {
      position: 0,
      help: 'A component file or directory. If no path is provided it reads from stdin.',
      metavar: 'PATH',
      list: true,
    }
  })
  .parse()

// when no files where received
if ((argv.path || []).length === 0) {
  // ensure we are using utf8 encoding
  process.stdin.setEncoding('utf8')

  // timer to warn user we are waiting for stdin
  let timer = setTimeout(function() {
    process.stderr.write('Waiting for stdin, for usage try --help')
  }, 5000)

  // when data is beeing received
  let source = ''
  process.stdin.on('data', function (chunk) {
    clearTimeout(timer)
    source += chunk
  })

  let components = []
  let template = Handlebars.compile(`${fs.readFileSync(path.join(__dirname, 'template.handlebars'))}`)

  // when all data is received
  process.stdin.on('end', function () {
    // catch possible errors beeing thrown from react-docgen
    try {
      components = parse(source, resolver.findAllExportedComponentDefinitions)
    } catch (e) {
      console.error('Error from react-docgen:')
      console.error(e)
    }

    // write the template filled in
    process.stdout.write(template({ components }))
  })
}
