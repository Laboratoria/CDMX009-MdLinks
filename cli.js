let colors = require('colors');

const { readFile, readFileValidation, readFilesStats } = require('./app.js')

const options = {
    path: {
        demand: true,
        alias: 'p',
        default: "README.md"
    },
}

const argv = require('yargs')
    .command('validate', 'Command to see the result of links validation contained in a Markdow file', options)
    .command('stats', 'Flag indicating if links are validated', options)
    .command('validateStats', 'Flag indicating if links are validated', options)
    .help()
    .argv

const command = argv._[0];

switch (command) {
    case 'validate':
        readFileValidation(argv.path);
        break;
    case 'stats':
        readFilesStats(argv.path)
        break;
    case 'validateStats':
        console.log(colors.cyan.bold('Validation and stats of the links ----> '));
        readFile(argv.path)
        return;
    default:
        console.log("Execute de --help command for more information")
};