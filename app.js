let fs = require("fs");
let path = require("path");
let url = require("url");
let http = require("http");
let https = require("https");
let fetch = require("node-fetch");

const mdLinks = {};

/* function option(){
  if (index<0){
    return console.log("help \n" 
    + "para leer un archivo:\n" +
    "debes ingresar la flag --read seguido de la ruta"
    )
  }

}
option() */
function findFile() {
  //console.log("process ", process.argv);
  let index = process.argv.indexOf("--read");
  if (index < 0)
    return console.log("Necesitas usar la flag --read con un uri valido");
  let uri = process.argv[index + 1];
  console.log("uri ", uri);
  let fileExt = path.extname(uri);
  console.log("extension ", fileExt);
  fileExt != ".md"
    ? console.log("Ingresa un archivo con extension .md")
    : //console.log("Si es archivo .md")
      readFiles(uri);
}

function readFiles(uri) {
  let fileContent = fs.readFileSync(uri, "utf-8");
  //console.log("todo el texto aqui ", fileContent)
  getLinks(fileContent, uri);
}

function getLinks(fileContent, uri) {
  let regexMarkdown = /\[(.+)\]\s(https?:.+?\S+)/gim; //obtiene las etiquetas y links sin parentesis
  let regexURL = /https?:.+?\S+/gim;
  let regexLabel = /\[(.+)\]\s/gim; //este regex trae todo lo que tenga []
  let deleteBrackets = fileContent.replace(/[\(\)]/gim, " "); //aqui quitamos los parentesis y ponemos espacios
  let matchMd = deleteBrackets.match(regexMarkdown); //trae los que coincidan con etiquetas y links
  let matchURL = deleteBrackets.match(regexURL); //trae solo los links
  //console.log("etiquetas y links ",matchMd)
  //console.log("long l&l ", matchMd.length + " markdown")
  //console.log("match url ", matchURL);
  //console.log("log match url ", matchURL.length+ " links")
  //consultLinks(matchURL,regexURL,uri)

  textLinks(matchMd, uri, regexURL, regexLabel);
}

/*function consultLinks(matchURL,regexURL,uri){
      matchURL.forEach(elementUrl =>{
    //let trueLink = regexURL.test(elementUrl);
         let textLink = elementUrl.match(regexURL)
    //     //let textLink = expRegText.exec(elementFile);
    console.log(textLink);
  }) 
}*/

function textLinks(matchMd, uri, regexURL, regexLabel) {
  let arrayN = [];
  matchMd.forEach((element) => {
    if (element < 0) return console.log("No se encontaro coincidencias");
    let links = element.match(regexURL);
    let urls = element.match(regexLabel);
    let newObjet = {
      href: links,
      label: urls,
      path: uri,
    };
    arrayN.push(newObjet);
    let getStatus = fetch(newObjet.href);
         getStatus.then((res)=>{
           return res.json();
         }).then((json)=>{
           console.log(json)

         })
    
  });
  //console.log(arrayN);
  //console.log(arrayN.length);
  

  //prueba(arrayN)
}
/* function prueba(arrayN){
  //console.log(arrayN)
} */

/* let getStatus = fetch('https://api.github.com/users/mitocode21');
         getStatus.then((res)=>{
           return res.json();
         }).then((json)=>{
           console.log(json)

         }) */

findFile();

mdLinks.findFile = findFile;
mdLinks.readFiles = readFiles;

module.exports = mdLinks;
