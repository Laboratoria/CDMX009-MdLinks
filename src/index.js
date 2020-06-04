const argv = require('./yargs').argv

const command = argv._[0]

switch (command) {
    case 'validate':
        console.log(argv.path, "Estas validando links morra")
        break;

    case 'stats':
        console.log("vas a crear estadisticas morra")
        break;
    default:
        console.log("ejecuta el comando --help morra")
}