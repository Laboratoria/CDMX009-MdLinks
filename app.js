'use strict';
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
//var result = md.render('# markdown-it rulezz!');
let fs = require('fs');
let path = require('path');
let https = require('https');
let http = require('http');
const fetch = require('node-fetch');

/* fs.readFile('README.md', 'utf-8', (err, data) => {
    if (err) {
        console.log('error: ', err);
    } else {
        console.log(data);

    }
}); */
/* function readFile() {
    let fileMd = fs.readFileSync('src/', 'utf-8');

    console.log(fileMd)
} */

//readFile()
//console.log(process.argv[1]);
function fileRoute() {
    //console.log(process.argv);
    let flagFound = process.argv.indexOf('--read')
    let uri = process.argv[flagFound + 1]
    console.log(uri);
    let extUri = path.extname(uri)
    //console.log(extUri)
    if (extUri != '.md') {
        console.log('Ingresa la ubicación de un archivo con extensión .md');
    } else {
        readFile(uri)
    }
}

function readFile(uri) {
    let fileMd = fs.readFileSync(uri, 'utf-8')
    //console.log(fileMd);
    searchLinks(fileMd, uri)
}

function searchLinks(fileMd, uri) {
    let expRegURL = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
    let newFile = fileMd.replace(/[\(\)]/g, " ");
    let expRegText = /(?<=\[).+?(?=\])/
    //console.log(newFile)
    let space = " "
    let arrNewFile = newFile.split(space)
    //console.log(arrNewFile);
    let links = arrNewFile.filter(text => text.includes('http'))
    //console.log(links);
    statsBasic(links)
    /*let texts = arrNewFile.filter(text => text.includes('['))*/

    //statsLinks(arrNewFile)

    arrNewFile.forEach(elementFile => {
        //console.log(elementFile)
        let trueLink = expRegURL.test(elementFile);
        //let trueLink = elementFile.match(expRegURL);
        let textLink = elementFile.match(expRegText)
        //let textLink = expRegText.exec(elementFile);
        //console.log(textLink);

        if (textLink != null) {
            textLink.forEach(text => {
                //console.log(text);
                let textUrls = text
                console.log(textUrls);
            });
        }
        if (trueLink === true) {
            /* let arrLinks = [elementFile]
            console.log(arrLinks.length); */
            let urls = elementFile
            //console.log(`${uri} ${urls}`);
            verifyLinks(urls, uri)
        }
    });

    /* const env = {};
    const tokens = md.parse(fileMd, env);
    //console.log(tokens);
    //let tokis = tokens.keys
    tokens.forEach(element => {
        console.log(element.tag);
    });
 */
}


function verifyLinks(urls, uri) {
    //let protocol = urls.slice(0, 5)
    //console.log(urls);

    fetch(urls)
        .then(res => {
            //console.log(res.status);
            if (res.ok === true) {
                let result = `${uri} ${urls} work ${res.status}`
                console.log(result);
                //counter++
                //console.log(counter);
                statsLinks(result)
            }
        })
        .catch(err => {
            //console.log('error:', err);
            let result = `${uri} ${urls} is broken`
            console.log(result);

            //
            //console.log(counter);
            statsLinks(result)
        })
}




let newArr = []

function statsLinks(result) {
    //console.log(result);
    let space = " "
    let cutResult = result.split(space)
    /* newArr.push(cutResult)
    console.log(newArr.length); */
    let statusResult = cutResult.slice(2, 3)
    //console.log(statusResult);
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

    function unique(value, index, self) {//comprueba, si el valor dado es el primero que ocurre, de lo contrario, debe ser un duplicado y no se copiará.
        return self.indexOf(value) === index;
    }
}

fileRoute()




