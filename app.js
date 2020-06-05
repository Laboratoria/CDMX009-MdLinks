const argv = require('./cli.js').argv


const command = argv._[0];

switch (command) {
    case 'validate':
        //console.log(argv.path, 'You are validating links')
        break;
    case 'stats':
        console.log('You are watching stats')
        break;
    default:
        console.log('You must to execute --help')
}