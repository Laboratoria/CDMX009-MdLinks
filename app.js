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
  getLinks(fileContent, uri)
  
}

function getLinks(fileContent,uri) {
  let regexMarkdown= /\[(.+)\]\s(https?:.+?\S+)/gmi;//obtiene las etiquetas y links sin parentesis
  let regexURL = /https?:.+?\S+/gim;
  let regexLabel =/\[(.+)\]\s/gim;//este regex trae todo lo que tenga []
  let deleteBrackets = fileContent.replace(/[\(\)]/gim, " ");//aqui quitamos los parentesis y ponemos espacios
  let matchMd = deleteBrackets.match(regexMarkdown)//trae los que coincidan con etiquetas y links
  let matchURL = deleteBrackets.match(regexURL);//trae solo los links
 //console.log("etiquetas y links ",matchMd)
 //console.log("long l&l ", matchMd.length + " markdown")
 //console.log("match url ", matchURL);
 //console.log("log match url ", matchURL.length+ " links") 
  //consultLinks(matchURL,regexURL,uri)
  
  textLinks(matchMd, regexMarkdown, uri,regexURL)
}

/*function consultLinks(matchURL,regexURL,uri){
      matchURL.forEach(elementUrl =>{
    //let trueLink = regexURL.test(elementUrl);
         let textLink = elementUrl.match(regexURL)
    //     //let textLink = expRegText.exec(elementFile);
    console.log(textLink);
  }) 
}*/

  function textLinks(matchMd, regexMarkdown,uri,regexURL){
    matchMd.forEach(element => {
    if(element< 0) return console.log("No se encontaro coincidencias");
       let markd = element.match(regexMarkdown)
       //let markd = regexMarkdown.exec(element);
       //console.log(markd)
       markd === null ? console.log('sin coincidencias con etiquetas y urls') :
       markd.forEach(labelLinks => {
         let links = labelLinks.match(regexURL)
         //console.log(links)
         https.get(links, (res) => {
          console.log('statusCode:', res.statusCode);
          console.log('headers:', res.headers);
        
          res.on('data', (d) => {
            process.stdout.write(d);
          });
        
        }).on('error', (e) => {
          console.error(e);
        });      
          
       });
     
  });
}


findFile();

mdLinks.findFile=findFile;
mdLinks.readFiles=readFiles;

module.exports = mdLinks;