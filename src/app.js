
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
 */

    'use strict';
var MarkDownIt = require('markdown-it'),
    md = new MarkDownIt();
let fs = require('fs');
let path = require('path');
let https = require('https');
let http = require('http');
const fetch = require('node-fetch');


//find file
function lookingForFile() {
    let flag = process.argv.indexOf('--read')
    let uri = process.argv[flag + 1]
    console.log(uri);
    let extUri = path.extname(uri)
    if (extUri != '.md') {
        console.log('Por favor ingresa un archivo con extensión .md');
    } else {
        readFile(uri)
    }
}

//read file
function scanFile(uri) {
    let fileMd = fs.scanFileSync(uri, 'utf-8')
    searchLinks(fileMd, uri)
}


//Get links
function getLinks(fileMd, uri) {
    let expRegURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
    let newFile = fileMd.replace(/[\(\)]/g, " ");
    let expRegText = /(?<=\[).+?(?=\])/
    let space = " "
    let arrNewFile = newFile.split(space)
    let links = arrNewFile.filter(text => text.includes('http'))
    statsBasic(links)
   

    arrNewFile.forEach(elementFile => {
        let trueLink = expRegURL.test(elementFile);
        //let trueLink = elementFile.match(expRegURL);
        let textLink = elementFile.match(expRegText)
        //let textLink = expRegText.exec(elementFile);
        

        if (textLink != null) {
            textLink.forEach(text => {
               
                let textUrls = text
                console.log(textUrls);
            });
        }
        if (trueLink === true) {
            //let arrLinks = [elementFile]
            let urls = elementFile
            verifyLinks(urls, uri)
            console.log(`${uri} ${urls}`);
        }
    });

}

//Link's status
function validation(urls, uri) {
    fetch(urls)
        .then(res => {
            if (res.ok === true) {
                let result = `${uri} ${urls} work ${res.status}`
                console.log(result);
                statsLinks(result)
            }
        })
        .catch(err => {
            let result = `${uri} ${urls} is broken`
            console.log(result);
            statsLinks(result)
        })
}

let newArr = []

function statsLinks(result) {
    let space = " "
    let cutResult = result.split(space)
    //newArr.push(cutResult)
    let statusResult = cutResult.slice(2, 3)
    newArr.push(statusResult)
    console.log(newArr);
}

function statsBasic(links) {
    console.log(links);
    let totalBasic = links.length
    console.log(`Total : ${totalBasic}`);
    let uniqueLinks = links.filter(unique);
    let howManyUnique = uniqueLinks.length
    console.log(`Unique : ${howManyUnique}`);
    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }
}

lookingForFile()
validation()


