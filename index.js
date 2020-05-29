#!/usr/bin/env node

let fs = require('fs');
const path = require('path');
let file;

const readFile = () => {
    let fileFlag = process.argv.indexOf('--file');
    if (fileFlag < 0) return console.log('Ingresa --file seguido de una ruta válida')
    file = process.argv[fileFlag + 1];
    let string = fs.readFileSync(file, 'utf-8');
    return string;
}
readFile();


const validateMD = () => {
    let findMd = path.extname(file);
    if (findMd === '.md') {
        console.log('This is a .md file');
        return file;
    }
    else {
        console.log('This isn\'t a .md file');
    }
}
console.log(validateMD());
console.log(readFile());

const getLinks = () => {

}


