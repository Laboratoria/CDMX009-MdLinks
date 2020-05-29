#!/usr/bin/env node
'use strict';
let fs = require('fs');
let path = require('path');
const chalk = require('chalk');
const fetch = require('node-fetch');

let uri = process.argv[2]
let lengthProcess = process.argv.length
let stats = process.argv[3];


const controller = (arrLinks) => {
    if (lengthProcess === 3) {
        arrLinks.forEach(link => {
            console.log(chalk`{yellow ${uri} ${link.slice(0, 50)}}`);
        })
    } if (stats === '--stats' || stats === '--s') {
        statsBasic(arrLinks)
    } if (stats === '--validate' || stats === '--val') {
        verifyLinks(arrLinks)

    }
}


const fileRoute = () => {
    new Promise((resolve, reject) => {
        if (path.isAbsolute(uri)) {
            let directory = fs.readdirSync(uri, 'utf-8')
            let arrDir = directory.forEach(re => {
                let extUri = path.extname(re)
                if (extUri === '.md') {
                    let newDir = path.join(uri, re)
                    searchLinks(newDir)
                }
            })
        }
        if (!path.isAbsolute(uri)) {
            let extUri = path.extname(uri)
            if (extUri != '.md') {
                reject(console.log(chalk.magenta('Ingresa una ruta, ejemplo: md-links some/example.md o --help')));
            } if (extUri != '.md' && uri === '--help') {
                console.log(chalk.yellow('\n Instrucciones :  \n md-links --help : recibe ayuda \n md-links <path> ó \n md-links <path> <options> \n <path> : ruta del archivo o directorio \n <options> : \n --validate o --val : regresa ruta de archivo,link evaluado, status de link ; \n --stats o --s : regresa la cantidad de links encontrados y links únicos; \n --validate --stats : regresa regresa la cantidad de links encontrados, links únicos y links "rotos"'));
            } else {
                searchLinks(uri)
            }
        }
    })
        .catch(err => err)
}



const searchLinks = (uri) => {
    let fileMd = fs.readFileSync(uri, 'utf-8')
    let newFile = fileMd.replace(/[\(\)]/g, " ");
    let space = " "
    let arrNewFile = newFile.split(space)
    let arrLinks = arrNewFile.filter(text => text.includes('http'))

    controller(arrLinks)
    let objectLinks = { links: arrLinks, path: uri, }
    return objectLinks
}



const verifyLinks = (arrLinks, route) => {
    let arrContent = arrLinks
    let totalLinks = arrLinks.length
    let arr = arrContent.map(link => new Promise((resolve) => {
        fetch(link)
            .then(res => {
                if (res.ok === true && lengthProcess === 4) {
                    let result = { file: `${uri}` }
                    result.href = `${link}`,
                        result.status = `${res.status} ok`,
                        resolve(result)
                    console.log(chalk` {rgb(114,176,29) ✔} ${uri} ${link.slice(0, 50)} {rgb(114,176,29) work ${res.status}}`);
                } if (res.ok === true && lengthProcess === 5) {
                    let result = { message: `${uri} ${link} work ${res.status} total: ${totalLinks}` }
                    result.working = "work"
                    statsLinks(result, totalLinks, arrContent)
                } else {
                    let result = {}
                    result.href = `${link.slice(0, 50)}`,
                        result.status = `${res.status} ok`,
                        result.file = `${route}`
                    resolve(result)
                }
            })
            .catch(err => {
                if (lengthProcess === 4) {
                    let result = { file: `${uri}` }
                    result.href = ` ${link}`
                    result.status = "400 is broken"
                    console.log(chalk` {rgb(255,89,94) ✖} ${uri} ${link.slice(0, 50)} {rgb(255,89,94) is broken}`);
                    resolve(result)
                }
                if (lengthProcess === 5) {
                    let result = { message: `${uri} ${link} is broken`, working: "is broken" }
                    statsLinks(result, totalLinks, arrContent)
                } else {
                    let result = {}
                    result.href = ` ${link.slice(0, 50)}`
                    result.status = "400 is broken"
                    resolve(result)
                }
            })
    }))
    return Promise.all(arr)

}


let newArr = []
let counter = 0
function statsLinks(result, totalLinks, arrContent) {
    let totalArr = newArr.length + 1
    newArr.push(result.working)
    if (totalLinks === totalArr) {
        let filtBroke = newArr.filter(news => news === 'is broken')
        counter = counter + filtBroke.length
        let totalBasic = arrContent.length
        let uniqueLinks = arrContent.filter(unique);
        let howManyUnique = uniqueLinks.length

        function unique(value, index, self) {
            return self.indexOf(value) === index;
        }
        console.log(chalk.italic('Validation statistics:'));
        console.log(chalk`{bold Total:} {cyan ${totalBasic}}`);
        console.log(chalk`{bold Unique:} {cyan ${howManyUnique}}`);
        console.log(chalk`{bold Broken:} {cyan ${counter}}`);
        let objStatus = { Total: totalBasic, Unique: howManyUnique, Broken: counter }
        return objStatus
    }

}


function statsBasic(arrLinks) {
    let totalBasic = arrLinks.length
    console.log(chalk.italic('Basic statistics:'));
    console.log(chalk`{bold Total:} {cyan ${totalBasic}}`);
    let uniqueLinks = arrLinks.filter(unique);
    let howManyUnique = uniqueLinks.length
    console.log(chalk`{bold Unique:} {cyan ${howManyUnique}}`);

    function unique(value, index, self) {//comprueba, si el valor dado es el primero que ocurre, de lo contrario, debe ser un duplicado y no se copiará.
        return self.indexOf(value) === index;
    }
}
fileRoute()


function mdLinks(route, options) {
    if (options) {
        let search = searchLinks(route)
        let links = search.links
        let file = search.path

        return verifyLinks(links, file).then(resp => resp).catch(err => err);
    } else {
        return new Promise(resolve => resolve(searchLinks(route)))
    }
}


module.exports = {
    mdLinks,
    fileRoute,
    searchLinks,
    verifyLinks,
    statsLinks
}

