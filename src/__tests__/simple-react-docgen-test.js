const TEST_TIMEOUT = 120000

/** global jasmine */
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST_TIMEOUT // eslint-disable-line no-undef

const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

var stdout
var stderr

function run(args, stdin) {
  return new Promise(resolve => {
    var binPath = path.join(__dirname, '../../dist/simple-react-docgen.js')
    fs.chmodSync(binPath, '0777')
    let spawned = spawn(binPath, args)
    stdout = ''
    stderr = ''

    spawned.stdout.on('data', data => stdout += data)
    spawned.stderr.on('data', data => stderr += data)
    spawned.on('close', () => resolve([stdout, stderr]))
    spawned.on('error', e => { throw(e) } )

    if (stdin) {
      spawned.stdin.write(stdin)
    }
    spawned.stdin.end()
  })
}

var component = fs.readFileSync(
  path.join(__dirname, './mock_dir/Component.js')
)

describe('./simple-react-docgen.js', () => {
  describe('< Component.js', () => {
    it('writes to sdout and do not err', () => {
      return run([], component).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)
  })
})
