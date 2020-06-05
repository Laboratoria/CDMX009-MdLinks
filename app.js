const path = require('path');

// make sure it's a markdown file
function checkItIsAMarkdownFile(file) {
    const ext = path.extname(file) === ".md";
    // console.log('verification', ext)
    if (ext === true) {
        console.log(readFile());
    } else if (ext != true) {
        console.log('extensión no valida')
    }

}
checkItIsAMarkdownFile('./README.md');

//The app must read a file
function readFile() {
    let fs = require('fs');
    let index = process.argv.indexOf("--file"); //flag--> --file
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1];
    let fileInformation = fs.readFileSync(uri, 'utf8');
    console.log(process.argv);
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileInformation);
}

// //node app.js --file README.md

function hola() {
    console.log("hola mundooo");
}
module.exports = {
    hola,
    checkItIsAMarkdownFile,
    readFile,

}