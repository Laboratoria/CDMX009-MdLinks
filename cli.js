/* const { validateLinks,
    statsLinks
} = require('./index.js'); */

const options = {
    path: {
        demand: true,
        alias: 'p', //path, gets a path

    },
}

const argv = require('yargs')
    .command('validate', 'Validate the files contained in the .md file', options)
    .command('stats', 'Flag indicating if links are validated', options)
    .help()
    .argv

const command = argv._[0];

switch (command) {
    case 'validate':
        console.log('You are validating links');
        //validateLinks(argv.path);
        break;

    case 'stats':
        console.log('You are watching stats');
        //statsLinks(argv.path);
        break;
    default:
        console.log('You must to execute --help')
}
