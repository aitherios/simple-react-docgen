#!/usr/bin/env node

import { parse, resolver } from 'react-docgen'

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

if ((argv.path || []).length === 0) {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()

  let timer = setTimeout(function() {
    process.stderr.write('Waiting for stdin, for usage try --help')
  }, 5000)

  let source = ''
  process.stdin.on('data', function (chunk) {
    clearTimeout(timer)
    source += chunk
  })

  process.stdin.on('end', function () {
    process.stdout.write(`${parse(source, resolver.findAllExportedComponentDefinitions)}`)
  })
}
