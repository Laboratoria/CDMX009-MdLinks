const fs = require('fs');
const { validateLinks } = require('./validateLinks')


function findFiles() { // ya retorna el docuemnto 
    let index = process.argv.indexOf('--file');
    let uri = process.argv[index + 1];
    if (index < 0 || !uri) return console.log("no hay archivo") // testing si mando vacio ???
    readFiles(uri) // asi es como brinco a la siguiente
    return uri
}

function readFiles(currentFile) { // ya retorna string con el archivo
    let string = fs.readFileSync(currentFile, 'utf8')
    getLinks(string)
    return currentFile;
}

function getLinks(string, link, regExp) {
    regExp = /\bhttps?:\/\/\S+/gi;
    let myArr = [];
    while ((link = regExp.exec(string)) !== null) {
        myArr.push(link[0]); // si pongo una variable y la retorno no arroja nada?
    }
    validateLinks(myArr)
    //console.log(myArr)
}


findFiles();

module.exports = {
    findFiles,
}
