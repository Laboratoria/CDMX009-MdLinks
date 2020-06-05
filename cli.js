const options = {
    path: {
        demand: true,
        alias: 'p', //path, recibe una ruta

    },
}

const argv = require('yargs')
    .command('validate', 'Validate the files contained in the .md file', options)
    .command('stats', 'Flag indicating if links are validated', options)
    .help()
    .argv

module.exports = {
    argv
}