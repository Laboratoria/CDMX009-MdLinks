'use strict';
//Dependencias
const fs = require('fs');
const path = require("path");
const fetch = require('node-fetch');
const chalk = require('chalk');
const log = console.log;

let uri = "";
let content = "";

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

function readFile(uri) {
    let content = fs.readFileSync(uri, "utf8")
    return content
}

// Falta promesa en readfile, 

content = readFile(uri)
//log(chalk.bgCyan("text content: ", content));

function searchLinks(content) {
    let regEx = (/https?:\S+\w/g);
    let links = content.match(regEx)
    return links
}

let links = searchLinks(content)

log(chalk.cyan("Founded links :", links));
let totalLinks = links.length;
log(chalk.black.bgCyan("total links:", totalLinks));

let arrayOfBrokenLinks = [];
let arrayOfCorrectLinks = [];

function verifyLinks(links) {
    // let indexVal = process.argv.indexOf("--validate")
    // if (indexVal < 0) {
    links.forEach(link => {
        fetch(link)
            .then(res => {
                let status = res.status
                if (status === 200) {
                    arrayOfCorrectLinks.push(link)
                    log(chalk.bgGreen(link, "Status OK: ", status))
                }
                else {
                    arrayOfBrokenLinks.push(link)
                    log(chalk.bgRed(link, "Broken link: ", status))
                }
            }
            )

    })
}
// }

verifyLinks(links)

log(chalk.cyan("Total links:", totalLinks));
log(chalk.bgGreen("Working links: ", arrayOfCorrectLinks));
log(chalk.bgRedBright("Broken links: ", arrayOfBrokenLinks));


// log("status: ", verifyLinks(links))


// function statistics(links) {

//     let total = links.lenght
//     log(chalk.cyan("Total links:", total));
//     log(chalk.bgGreen("Working links: ", arrayOfCorrectLinks.lenght));
//     log(chalk.bgRedBright("Broken links: ", arrayOfBrokenLinks.lenght));
// }

// statistics(links)