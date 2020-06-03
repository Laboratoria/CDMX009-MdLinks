#!/usr/bin/env node
'use strict';

const meow = require ('meow');
// const { file } = require('./readFile');
const foo = require ('./findFile');

let cli = meow ([
    `
    Usage
      $ --file <input>

    Options
      --validate, -v  Include links validated
      --stats, -s  Include stats of links
      --validate --stats, -v -s  Include links validated and stats

    Example
    $ --file example.md --validate
`, {
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
console.log(cli.input[0]);
// foo(cli.input[0], cli.flags)