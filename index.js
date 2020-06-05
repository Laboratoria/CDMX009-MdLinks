#!/usr/bin/env node


const findLinks = require('./utils/findLinks')
const linksFunctions = require('./utils/validateAndStatusLinks')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const readDirectory=(uri, comandLine4, comandLine5)=>{
    let direc = fs.readdirSync(uri)
    direc.forEach(elemnt => {
       
        let lastmd = elemnt.lastIndexOf(".");
        let newF = elemnt.slice(lastmd);
        if (newF === '.md') {
            let newPath = path.join(uri, elemnt)
            let expR = /\\/gi;
            let realPath = newPath.replace(expR, "\/");
            let fileDir = fs.readFileSync(realPath, 'utf-8')
            findLinks(fileDir, realPath)
                .then(linksReal => {
                    return linksFunctions.getStatusLink(linksReal, comandLine4, comandLine5, realPath)
                })
                .catch(er => console.log(er))
        }
        else {

            console.log(chalk.gray.bold("It is not a .md extention file ******" + "  " + elemnt))
        }
    })
}


const readFile= (uri, comandLine4, comandLine5)=>{
    const probe = uri.lastIndexOf(".");
    const typeFile = uri.slice(probe);
    if (typeFile === ".md") {
        const fileReal = fs.readFileSync(uri, 'utf-8')
        findLinks(fileReal, uri)
            .then(linksReal => {
                return linksFunctions.getStatusLink(linksReal, comandLine4, comandLine5, uri)
            })
            .catch(er => console.log(er))
    } else { 
        const messErr= 'you need a file with .md extention o you missed the flag --file before your path :) '
        console.log(chalk.redBright(messErr))
        return messErr
         }
}


const allTheLinks = () => {
    const newFile = process.argv.indexOf('--file');
    const uri = process.argv[newFile + 1];
    const comandLine4 = process.argv[newFile + 2]
    const comandLine5 = process.argv[newFile + 3]
    
    if (process.argv[2]!== '--help'){
    if (!fs.lstatSync(uri).isDirectory()) {
        readFile(uri, comandLine4, comandLine5) 
    } else {
        readDirectory(uri, comandLine4, comandLine5 )
       
    }
    } else {console.log( `
    --v         validate 
    --validate  validate
    --s         stats 
    --stats     stats
    --s/--stats && --v/--validate  stats & validate`)}
}

allTheLinks();

const mdLinks = { allTheLinks, readFile, readDirectory};
module.exports= mdLinks;






