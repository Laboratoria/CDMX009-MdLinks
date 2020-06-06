#!/usr/bin/env node
'use strict';

const meow = require ('meow');
const { file } = require('./readFile');
// const foo = require ('./findFile');

let cli = meow ([
    `
    Usage
      $ ./cli.js <input> --flag

    Options
      --validate, -v  Include links validated
      --stats, -s  Include stats of links
      --validate --stats, -v -s  Include links validated and stats

    Example
    $ ./cli.js example.md --validate
`, {
    booleanDefault: undefined,
    flags: {
        validate: {
            type: 'boolean',
            alias: 'v'
        },
        stats: {
            type: 'boolean',
            alias: 's'
        }
    }
}
])
file(cli.input[0])