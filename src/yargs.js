const opciones = {
    path: {
        demand: true, //forzado
        alias: 'p', // path ruta direccion
        //default: "README.md" //un archivo readme
    },
}

const argv = require('yargs')
    .command('validate', 'aqui vas a escribir que hace validate', opciones)
    .command('stats', 'aqui se genera un comentario', opciones)
    .help()
    .argv

module.exports = {
    argv
}