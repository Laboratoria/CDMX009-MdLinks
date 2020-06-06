//Funcion para leer el README.md

/* ***** FUNCION OK ***** */

const fs = require('fs'); 
let index = process.argv.indexOf('--file'); 

function readFile() {
    if (index < 0) return console.log('No se encontró el archivo');
    let uri = process.argv[index + 1];
    let fileContent = fs.readFileSync(uri, 'utf8');   

    console.log(process.argv);
    console.log('index: ', index);
    console.log('uri: ', uri);
    console.log('The file content: ', fileContent);
}

readFile();

module.exports = { readFile }