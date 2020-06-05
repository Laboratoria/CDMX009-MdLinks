#!/usr/bin/env node

const chalk = require('chalk');
const { showValidate,
    showStats,
    showValidateStats } = require('./utils/mdLinks');

const opts = {
    file: {
        demand: true,
    }
}

const argv = require('yargs')
    .command('validate', 'Validate URLs status in a markdown file', opts)
    .command('stats', 'Give the number of ok and broken URLs in a markdown file', opts)
    .command('validateStats', 'Validate and stats URLs in a markdown file', opts)
    .help()
    .argv;


let command = argv._[0];

switch (command) {
    
    case 'validate':
        console.log(chalk.cyan.bold('Option: Validate'));
        showValidate(argv.file);
        return;

    case 'stats':
        console.log(chalk.cyan.bold('Option: Stats'));
        showStats(argv.file);
        return;

    case 'validateStats':
        console.log(chalk.cyan.bold('Option: ValidateStats'));
        showValidateStats(argv.file);
        return;
    
    default:
        console.log('Unrecognized command line');

}

