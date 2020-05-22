#!/usr/bin/env node
'use strict';
let fs = require('fs');
let path = require('path');
const chalk = require('chalk');
const fetch = require('node-fetch');


let uri = process.argv[2]
let lengthProcess = process.argv.length
let stats = process.argv[3];


const fileRoute = () => {
    return new Promise((resolve, reject) => {
        let extUri = path.extname(uri)
        if (extUri != '.md') {
            reject(console.log(chalk.magenta('Ingresa la ubicación de un archivo con extensión .md')));
        } else {
            readFile(uri)
        }
    })
}

const readFile = (uri) => {
    let fileMd = fs.readFileSync(uri, 'utf-8')
    return fileMd
}


const searchLinks = (uri) => {
    let fileMd = readFile(uri)
    //let expRegURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
    let newFile = fileMd.replace(/[\(\)]/g, " ");
    //let expRegText = /(?<=\[).+?(?=\])/
    let space = " "
    let arrNewFile = newFile.split(space)
    let linksText = arrNewFile.filter(text => text.includes('['))
    let links = arrNewFile.filter(text => text.includes('http'))

    let objLinks = { links: links, path: uri, }
    return objLinks

}


const verifyLinks = () => {

    let searchUrl = searchLinks(uri)

    let links = searchUrl.links
    let uris = searchUrl.path
    let totalLinks = links.length

    if (stats === '--validate' || stats === '--val') {
        const validate = links.forEach(link => new Promise((resolve) => {

            fetch(link)
                .then(res => {
                    //console.log(res.status);
                    if (res.ok === true && lengthProcess === 4) {
                        let result = { message: `${uris} ${link} work ${res.status} total: ${totalLinks}` }
                        result.working = "work"
                        resolve(result)
                        console.log(chalk` ${uris} ${link} {rgb(114,176,29) work ${res.status}}`);
                        // llamar al contador funcion (2 globales)cuantos tengo, cuantos llevo
                    } if (res.ok === true && lengthProcess === 5) {
                        let result = { message: `${uris} ${link} work ${res.status} total: ${totalLinks}` }
                        result.working = "work"
                        statsLinks(result, totalLinks, links)
                    }

                })
                .catch(err => {
                    if (lengthProcess === 4) {
                        let result = { message: `${uri} ${link} is broken`, working: "is broken" }
                        console.log(chalk` ${uris} ${link} {rgb(255,89,94) is broken}`);
                        resolve(result)
                    }
                    //console.log('error:', err);
                    if (lengthProcess === 5) {
                        let result = { message: `${uris} ${link} is broken`, working: "is broken" }
                        statsLinks(result, totalLinks, links)
                    }

                })

        }))
        return validate
    }

}


let newArr = []
let counter = 0
function statsLinks(result, totalLinks, links) {
    let totalArr = newArr.length + 1
    newArr.push(result.working)
    //console.log(totalArr);
    if (totalLinks === totalArr) {
        let filtBroke = newArr.filter(news => news === 'is broken')
        counter = counter + filtBroke.length
        let totalBasic = links.length
        let uniqueLinks = links.filter(unique);
        let howManyUnique = uniqueLinks.length

        function unique(value, index, self) {
            return self.indexOf(value) === index;
        }
        console.log(chalk.italic('Validation statistics:'));
        console.log(chalk`{bold Total:} {cyan ${totalBasic}}`);
        console.log(chalk`{bold Unique:} {cyan ${howManyUnique}}`);
        console.log(chalk`{bold Broken:} {cyan ${counter}}`);

    }
}
//statsLinks()

function statsBasic() {
    let searchUrl = searchLinks(uri)
    let links = searchUrl.links
    let uris = searchUrl.path
    //console.log(statsLinks.links);
    //sconsole.log(links);
    if (lengthProcess === 3) {
        links.forEach(link => {
            console.log(chalk`{yellow ${uris} ${link}}`);
        })
    } if (stats === '--stats' || stats === '--s') {
        let totalBasic = links.length
        console.log(chalk.italic('Basic statistics:'));

        console.log(chalk`{bold Total:} {cyan ${totalBasic}}`);

        let uniqueLinks = links.filter(unique);
        let howManyUnique = uniqueLinks.length
        console.log(chalk`{bold Unique:} {cyan ${howManyUnique}}`);

        function unique(value, index, self) {//comprueba, si el valor dado es el primero que ocurre, de lo contrario, debe ser un duplicado y no se copiará.
            return self.indexOf(value) === index;
        }
    }
}
fileRoute()
verifyLinks()
statsBasic()


module.exports = readFile



function mdLinks(route, options) {
    new Promise((resolve, reject) => {
        //console.log(route);
        //let read = readFile(route)
        //console.log(read);
        let search = searchLinks(route)
        //console.log(searchLinks(url));
        let links = search.links

        if (options) {
            verifyLinks(search)
        }
        let arrLinks = links.map(link => {
            let objResult = { file: link, href: search.path }
            return objResult

        })
        resolve(arrLinks)
    });
}
mdLinks('src/file.md', { validate: true })


