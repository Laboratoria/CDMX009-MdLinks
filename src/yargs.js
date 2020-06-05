const { validateLinks } = require('./index')
const chalk = require('chalk')
const opciones = {
    path: {
        demand: true, //forzado
        alias: 'p', // path ruta direccion
        //default: "README.md" //un archivo readme
    },
}



const argv = require('yargs')
    .command('validate', 'hara la validación de los links', opciones)
    .alias('--validate', '--val')
    .command('stats', 'generará el total de links y a su vez dara el total de links que sirven y los que no', opciones)
    .alias('--stats', '--s')
    .help()
    .argv

module.exports = {
    validateLinks,
    argv
}