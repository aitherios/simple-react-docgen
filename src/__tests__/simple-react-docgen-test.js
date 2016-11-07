const TEST_TIMEOUT = 120000

// global jasmine
jasmine.DEFAULT_TIMEOUT_INTERVAL = TEST_TIMEOUT // eslint-disable-line no-undef

const path = require('path')
const fs = require('fs')
const spawn = require('child_process').spawn

// run the simple-react-docgen script with optional stdin param */
function run(args, stdin) {
  // clean stdout and stderr outputs
  var stdout = ''
  var stderr = ''

  // return as promise to be used in tests
  return new Promise(resolve => {
    let binPath = path.join(__dirname, '../../dist/simple-react-docgen.js')
    // ensure script is runnable
    fs.chmodSync(binPath, '0777')
    let spawned = spawn(binPath, args)

    spawned.stdout.on('data', data => stdout += data)
    spawned.stderr.on('data', data => stderr += data)
    spawned.on('close', () => resolve([stdout, stderr]))
    spawned.on('error', e => { throw(e) } )

    // when stdin is used
    if (stdin) {
      spawned.stdin.write(stdin)
    }
    spawned.stdin.end()
  })
}

describe('./simple-react-docgen.js', () => {
  // reading file TwoComponents.js from stdin
  describe('< mock_dir/TwoComponents.js', () => {
    it('writes to sdout and do not err', () => {
      let component = fs.readFileSync(path.join(__dirname, './mock_dir/TwoComponents.js'))
      return run([], component).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)
  })

  // reading file ClassComponent.js from stdin
  describe('< mock_dir/ClassComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let component = fs.readFileSync(path.join(__dirname, './mock_dir/ClassComponent.js'))
      return run([], component).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)
  })

  // reading file StatelessComponent.js from stdin
  describe('< mock_dir/StatelessComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let component = fs.readFileSync(path.join(__dirname, './mock_dir/StatelessComponent.js'))
      return run([], component).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)
  })

  // reading file NotAComponent.js from stdin
  describe('< mock_dir/NotAComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let component = fs.readFileSync(path.join(__dirname, './mock_dir/NotAComponent.js'))
      return run([], component).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)
  })
})
