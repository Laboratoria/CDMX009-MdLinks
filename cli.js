#!/usr/bin/env node
'use strict';

const meow = require('meow');
var mdLinks = require('./index.js');

var mdLinks = meow([
    'Arguments',
    '  --file   Write the path of the file you would like to check',
    "Options",
    "--validate Tells you the status of the founded link",
    "--stats    Gives you some basic statistics about the foundes links, as how many broken, working and total links."
]);

// console.log(cli.flags.all ? catNames.all.join('\n') : catNames.random());