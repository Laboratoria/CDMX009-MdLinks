#!/usr/bin/env node

const fs = require('fs');
const { validateLinks, stastLinks } = require('./validateLinks')
let index = process.argv[3];

function menuOptions(links, results) {
    if (index === '--validate') {
        validateLinks(links);
    } else if (index === '--stats') {
        stastLinks(results);
    } else if (index === '--validate --stats') {
        validateLinks(links);
        stastLinks(results);
    }
};
menuOptions();

function findFiles() {
    let index = process.argv.indexOf('--file');
    let uri = process.argv[index + 1];
    if (index < 0 || !uri) return console.log("no hay archivo")
    readFiles(uri)
    return uri
}

function readFiles(currentFile) {
    let string = fs.readFileSync(currentFile, 'utf8')
    getLinks(string)
    return currentFile;
}

function getLinks(string, link, regExp) {
    regExp = /\bhttps?:\/\/\S+/gi;
    let myArr = [];
    while ((link = regExp.exec(string)) !== null) {
        myArr.push(link[0]);
    }
    validateLinks(myArr)
}

findFiles();

module.exports = {
    findFiles,
}
