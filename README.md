# simple-react-docgen
[![npm version](https://img.shields.io/npm/v/simple-react-docgen.svg?style=flat-square)](https://www.npmjs.com/package/simple-react-docgen)
[![dependency status](https://img.shields.io/david/team-767/simple-react-docgen.svg?style=flat-square)](https://david-dm.org/team-767/simple-react-docgen)
[![build status](https://img.shields.io/travis/team-767/simple-react-docgen.svg?style=flat-square)](https://travis-ci.org/team-767/simple-react-docgen)

Generate simple React components documentation in [Markdown](https://en.wikipedia.org/wiki/Markdown).

## Usage

Example:

`$ simple-react-docgen src -o DOC.md`

Check every option runnig `simple-react-docgen` with `--help` or `-h`:

```
$ simple-react-docgen --help

Usage: simple-react-docgen [paths]... [options]

paths     Component files or directories. If nothing is provided it reads from stdin.

Options:
   -x, --extension          File extensions to consider. Repeat to define multiple extensions. Default:  [js,jsx]
   -e, --exclude            Filename patterns to exclude. Default:  []
   -i, --ignore             Folders to ignore. Default:  [node_modules,__tests__,__mocks__]
   -o FILE, --output FILE   Markdown file to write. If nothing is provided it writes to stdout.

Create a markdown documentation from React components.
If a directory is passed, it is recursively traversed.
```

## Contributing

First of all, **thank you** for wanting to help!

1. [Fork it](https://help.github.com/articles/fork-a-repo).
2. Create a feature branch - `git checkout -b more_magic`
3. Add tests and make your changes
4. Check if tests are ok - `npm test`
5. Commit changes - `git commit -am "Added more magic"`
6. Push to Github - `git push origin more_magic`
7. Send a [pull request](https://help.github.com/articles/using-pull-requests)! :heart: :sparkling_heart: :heart:
