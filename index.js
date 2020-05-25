const fs = require('fs')
const fetch = require('node-fetch');
const chalk = require('chalk')

function allTheLinks() {
    let newFile = process.argv.indexOf('--file');
    let uri = process.argv[newFile + 1];
    let probe = uri.lastIndexOf(".");
    let typeFile = uri.slice(probe);
    //console.log(typeFile);
    if (typeFile === ".md") {
        //console.log ("ahí vámos")
        read(uri) //para leer el archivo
            .then(content => findLinks(content) //para extraer los links
                .then(linksReal => getStatusLink(linksReal))

            ).catch(er => console.log(er))
    }
    else { console.log("you need a file with an .md extention ") }
}
allTheLinks();


function read(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, function (err, content) {
            if (err) {
                return reject(err)
            }
            resolve(content)
        })
    })
}

const findLinks = (datos) => {
    let joinArray = []
    return new Promise((resolve) => {
        let regularE = /(ftp|http|https):\/\/.*\)/gi;
        let noStr = datos;
        let str = noStr.toString();
        let myArray;
        while ((myArray = regularE.exec(str)) !== null) {

            // let joinData= myArray[0].replace(")", " ")
            let joinData = {
                link: myArray[0].replace(")", " "),

            };
            joinArray.push(joinData);
        }
        //console.log(joinArray)
        resolve(joinArray);

    })
}

function getStatusLink(links) {
    let validLink = 0;
    let brokenLink = 0;
    let erros = 0
    links.map(element => {
        if (process.argv[4] === "--stats" || process.argv[5] === "--stats") {
            fetch(element.link)
                .then((res) => {
                    let object = {
                        href: res.url,
                        status: res.status,
                        statusText: res.statusText
                    };
                    if (object.status === 200) {
                        validLink++;
                    }
                    if (object.status !== 200) {
                        brokenLink++;
                    }
                })
                .then(() => {
                    if (links.length === validLink + brokenLink) {
                        return console.log(chalk.magenta.bold(`Links totales: ${totalLinks = links.length}\n Links corectos:${validLink}\n Links erróneos: ${brokenLink}`))
                    }
                })
                .catch((err) => {
                    let objetFail = err.message
                    if (objetFail !== null) {
                        erros++;
                        return console.log(chalk.magenta.bold(`Total Links: ${totalLinks = links.length}\n   
                                Right Links :${validLink}\n 
                                Wrong Links : ${brokenLink}\n
                                Connection error : ${erros}   ${objetFail}`))
                    }
                })
        }
        if (process.argv[4] === "--validate" || process.argv[5] === "--validate") {
            fetch(element.link)
                .then((res) => {
                    let object = {
                        href: res.url,
                        status: res.status,
                        statusText: res.statusText
                    };
                    if (object.status === 200) { console.log(chalk.green(`${object.href}  ${object.status}  OK `)) }
                    if (object.status !== 200) { console.log(chalk.red(`${object.href}  ${object.status}  BAD `)) }
                })
                .catch(err => console.log(err.message))
        }
    })
}

