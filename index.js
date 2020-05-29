#!/usr/bin/env node

let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
let file;
let content;

const readFile = () => {
    let fileFlag = process.argv.indexOf('--file');
    if (fileFlag < 0) return console.log('Ingresa --file seguido de una ruta válida')
    file = process.argv[fileFlag + 1];
    content = fs.readFileSync(file, 'utf-8');
    return content;
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

const getLinks = () => {
    let regEx = (/https?:\S+\w/g);
    let links = content.match(regEx)
    return links
}
console.log(validateMD());
console.log(readFile());
console.log(getLinks());


