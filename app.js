#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');
let file;
let string;
let links;
let matches = [];

//Find file
const indexFile = () => {
  let fileFlag = process.argv.indexOf('--file');
  if (fileFlag > 0) {
  file = process.argv[fileFlag + 1];
  let directory = process.cwd();
  return console.log('file:', file, '\n dir: ', directory);
  }
  else{
    console.log(chalk.red('Ingresa un archivo .md seguido de --file'));
  }
}
indexFile();

//Reg expresions to find links
const fileLinks = () => {
  matches = string
  .replace(/[{()}]/g, '')
  .match(/\bhttps?:\/\/\S+/gi);
  return matches
}
//Read file and find expresions
const reading = () => {
  let pathFile = path.extname(file)
  if (pathFile === '.md') {
    string = fs.readFileSync(file, 'utf-8');
    links = fileLinks(string);
    console.log('path: ', pathFile, '✔');
    console.log('links: ', links);
  }
  else{
    console.log(chalk.red('path: ', pathFile , '✘', '\nIngresa únicamente archivos .md'));
  }
}
reading();










function validateLinks() { 
  let promises = matches.map(element=>fetch(element))
  return Promise.allSettled(promises)
  .then(res=>{
    let final = res.map(result=>{
      let okStatus = [];
      let brokeStatus = [];
      let obj = 
       {
        url: result.value ? result.value.url:"error", 
        status:result.value ? result.value.status:"error", 
        text:result.value ? result.value.statusText:"error"
      }
      //console.log('obj', obj.status)
      if (obj.status === 404) {
        brokeStatus.push(obj.url);
        console.log('broke: ', brokeStatus)
      }
      else{
        okStatus.push(obj.url);
        console.log('OK: ', okStatus)
      }
      return obj
    })
    console.log('final', final)
    //console.log('obj', obj.status)
    return final
  })
}
validateLinks()   




module.exports = indexFile;



