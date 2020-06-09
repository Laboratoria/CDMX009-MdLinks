#!/usr/bin/env node

const fs = require('fs');
const { validateLinks, showLinksValidated, showLinksStats } = require('./index')

function readFiles(ruta) {
    let string = fs.readFileSync(ruta, 'utf8')
    getLinks(string)
    return string;
}

function getLinks(string, link) {
    let regExp = /\bhttps?:\/\/\S+/gi;
    let myArr = [];
    while ((link = regExp.exec(string)) !== null) {
        myArr.push(link[0]);
    }
    validateLinks(myArr)
}

function readFileValidation(ruta) { //validar lectura
    let string = fs.readFileSync(ruta, 'utf8')
    getLinksValidation(string)
    return string;
}

function getLinksValidation(string, link) { //validar obtener links
    let regExp = /\bhttps?:\/\/\S+/gi;
    let myArr = [];
    while ((link = regExp.exec(string)) !== null) {
        myArr.push(link[0]);
    }
    showLinksValidated(myArr)
}

function readFilesStats(ruta) { //stats lectura
    let string = fs.readFileSync(ruta, 'utf8')
    getLinkStats(string)
    return string;
}

function getLinkStats(string, link) { //stats obtener
    let regExp = /\bhttps?:\/\/\S+/gi;
    let myArr = [];
    while ((link = regExp.exec(string)) !== null) {
        myArr.push(link[0]);
    }
    showLinksStats(myArr)
}

module.exports = {
    readFiles,
    getLinks,
    readFileValidation,
    readFilesStats
}
