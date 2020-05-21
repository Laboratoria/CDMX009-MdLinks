let fs = require('fs');
let path = require('path');
let url = require('url');
let http = require('http');
let https = require('https');
let fetch = require('node-fetch');

const mdLinks = {}

function findFile() {
  //console.log("process ", process.argv);
  let index = process.argv.indexOf('--file')
  if(index < 0) return console.log("Necesitas usar la flag --file con un uri valido");
  let uri = process.argv[index + 1]
  console.log("uri ", uri);
  let fileExt = path.extname(uri)
  console.log("extension ", fileExt)
  fileExt != '.md' ? console.log('Ingresa un archivo con extension .md') :
  //console.log("Si es archivo .md") 
  readFiles(uri)
  
}

function readFiles(uri){
  let fileContent = fs.readFileSync(uri, 'utf-8');
  //console.log("todo el texto aqui ", fileContent)
  getLinks(fileContent)
  
}

function getLinks(fileContent) {
  let regexURL = /\[(.+)\]\((https?:.+)\)/gim;
  let matchReg = fileContent.match(regexURL)
  console.log("label con linksssss \n", matchReg);

  let array =[]; 
  //   for(i=0; regexURL.exec(match) !==null; i++){
  //   const newObjet ={

    
  //   }
  //   array.push(newObjet);

  // }
  // console.log(array)
  // console.log(i)

}

findFile();

mdLinks.findFile=findFile;
mdLinks.readFiles=readFiles;

module.exports = mdLinks;