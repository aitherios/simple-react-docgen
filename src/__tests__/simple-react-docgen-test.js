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
  // reading file ClassComponent.js from stdin
  describe('< mock_dir/ClassComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/ClassComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)

    it('returns the documentation markdown', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/ClassComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        // returns the filled in template
        expect(stdout).toBe(
`ClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string||name description

`
        )
        expect(stderr).toBe('')
      })
    })
  })

  // reading file StatelessComponent.js from stdin
  describe('< mock_dir/StatelessComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/StatelessComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)

    it('returns the documentation markdown', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/StatelessComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        // returns the filled in template
        expect(stdout).toBe(
`StatelessComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string||name description

`
        )
        expect(stderr).toBe('')
      })
    })
  })

  // reading file ReactCreateClassComponent.js from stdin
  describe('< mock_dir/ReactCreateClassComponent.js', () => {
    it('writes to sdout and do not err', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/ReactCreateClassComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).toBe('')
      })
    }, TEST_TIMEOUT)

    it('returns the documentation markdown', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/ReactCreateClassComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        // returns the filled in template
        expect(stdout).toBe(
`**ReactCreateClassComponent** ReactCreateClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string|yes|name description
age|number||age description

`
        )
        expect(stderr).toBe('')
      })
    })
  })

  // reading file NotAComponent.js from stdin
  describe('< mock_dir/NotAComponent.js', () => {
    it('writes to stderr', () => {
      let stdin = fs.readFileSync(path.join(__dirname, './mock_dir/NotAComponent.js'))
      return run([], stdin).then(([stdout, stderr]) => {
        expect(stdout).toBe("")
        expect(stderr).not.toBe('')
      })
    }, TEST_TIMEOUT)
  })

  // crawling mock_dir directory
  describe('mock_dir', () => {
    it('writes to sdout and stderr', () => {
      return run([path.join(__dirname, './mock_dir')]).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).not.toBe('')
      })
    }, TEST_TIMEOUT)

    it('returns the documentation markdown', () => {
      return run(['src/__tests__/mock_dir']).then(([stdout, stderr]) => {
        // returns the filled in template
        expect(stdout).toBe(
`### \`src/__tests__/mock_dir/ClassComponent.js\`

ClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string||name description

### \`src/__tests__/mock_dir/ReactCreateClassComponent.js\`

**ReactCreateClassComponent** ReactCreateClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string|yes|name description
age|number||age description

### \`src/__tests__/mock_dir/StatelessComponent.js\`

StatelessComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string||name description

`
        )
      })
    })
  })

  // passing files directly
  describe('mock_dir/ClassComponent.js mock_dir/ReactCreateClassComponent.js', () => {
    it('writes to sdout and stderr', () => {
      return run([path.join(__dirname, './mock_dir')]).then(([stdout, stderr]) => {
        expect(stdout).not.toBe('')
        expect(stderr).not.toBe('')
      })
    }, TEST_TIMEOUT)

    it('returns the documentation markdown', () => {
      return run([
        'src/__tests__/mock_dir/ClassComponent.js',
        'src/__tests__/mock_dir/ReactCreateClassComponent.js'
      ]).then(([stdout, stderr]) => {
        // returns the filled in template
        expect(stdout).toBe(
`### \`src/__tests__/mock_dir/ClassComponent.js\`

ClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string||name description

### \`src/__tests__/mock_dir/ReactCreateClassComponent.js\`

**ReactCreateClassComponent** ReactCreateClassComponent description

Property | Type | Required | Description
:--- | :--- | :--- | :---
name|string|yes|name description
age|number||age description

`
        )
      })
    })
  })

})
