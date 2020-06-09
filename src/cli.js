const argv = require('./yargs').argv
const command = argv._[0]
const { readFiles, readFileValidation, readFilesStats } = require('./app')
const chalk = require('chalk')

switch (command) {
    case 'validate':
        console.log(chalk.cyan.bold.underline(('These are the links validated ----> red: broken links / green: useful links')));
        readFileValidation(argv.path)
        //console.log(argv.path)
        break;
    case 'stats':
        console.log(chalk.cyan.bold.underline('This is the statistics of the links ----> '));
        readFilesStats(argv.path)
        break;
    case 'validateStats':
        console.log(chalk.cyan.bold.underline('These are the validation and  the statistics of the links ----> '));
        readFiles(argv.path)
        return;
    default:
        console.log("Execute de --help command for more information")
};