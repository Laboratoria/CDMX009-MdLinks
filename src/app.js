#!/usr/bin/env node
'use strict';
let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let fetch = require('node-fetch');

let uri = process.argv[2]
let lengthProcess = process.argv.length
let stats = process.argv[3];


const control = (arrLinks) => {
    if (lengthProcess === 3) {
        arrLinks.forEach(link => {
            console.log(chalk`{blue${uri} ${link.slice(0, 50)}}`);
        })
    } if (stats === '--stats' || stats === '--s') {
        statsBasic(arrLinks)
    } if (stats === '--validate' || stats === '--val') {
        validation(arrLinks)

    }
}

function getPath() {
    let index = process.argv.indexOf("--file")
    if (index < 0) { return log(chalk.bgRed("Por favor ingresa el argumento --file seguido de la ruta del archivo Markdown.")) }
    let uri = process.argv[index + 1]
    let extension = path.extname(uri)
    // log(chalk.black.bgYellowBright("extension:", extension))
    if (extension != '.md') {
        log(chalk.bgRed("Por favor ingresa la ruta de un archivo Markdown (extensión .md)"));
    } else {
        return uri
    }
}

uri = getPath();


const detectLinks = (uri) => {
    let fileMd = fs.readFileSync(uri, 'utf-8')
    let newFile = fileMd.replace(/[\(\)]/g, " ");
    let space = " "
    let arrNewFile = newFile.split(space)
    let arrLinks = arrNewFile.filter(text => text.includes('http'))

    control(arrLinks)
    let objectLinks = { links: arrLinks, path: uri, }
    return objectLinks
}



function validateLinks() { 
    let promises = matches.map(element=>fetch(element))
    return Promise.allSettled(promises)
    .then(res=>{
      let final = res.map(result=>{
        return {
          url: result.value ? result.value.url:"error", 
          status:result.value ? result.value.status:"error", 
          text:result.value ? result.value.statusText:"error"
        }
      })
      console.log(final)
      return final
    })
  }
  validateLinks();

let newArr = []
let counter = 0
function statsLinks(result, totalLinks, arrContent) {
    let totalArr = newArr.length + 1
    newArr.push(result.working)
    if (totalLinks === totalArr) {
        let filtBroke = newArr.filter(news => news === 'It is not working')
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

    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }
}
getPath();


function mdLinks(route, options) {
    if (options) {
        let search = detectLinks(route)
        let links = search.links
        let file = search.path

        return validation(links, file).then(resp => resp).catch(err => err);
    } else {
        return new Promise(resolve => resolve(detectLinks(route)))
    }
}


module.exports = {
    mdLinks,
    getPath,
    detectLinks,
    validateLinks,
    statsLinks
}



//--file --validate --links --stats

/*let fs = require('fs')
function readFile() {
    let index = process.argv.indexOf("--file")
    if (index < 0) return console.log("No se encuentra el archivo")
    let uri = process.argv[index + 1]
    let fileContent = fs.readFileSync(uri, 'utf8')
    console.log(process.argv)
    console.log("index: ", index)
    console.log("uri: ", uri)
    console.log("contenido del archivo: ", fileContent)
    readFile();
}
*/