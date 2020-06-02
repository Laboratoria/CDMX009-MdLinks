const options = {
    routeFile: {
        demand: true,
        alias: 'f'
    },
}
const argv = require('yargs')
    .command('validate', 'Valida los links que contiene el archivo .md', options)
    //.command('stats', 'Muestra la cantidad de links validos y links rotos', options)
    .help()
    .argv;

module.exports = {
    argv
}