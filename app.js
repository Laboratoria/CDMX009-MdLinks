#!/usr/bin/env node

let fs = require("fs");
let path = require("path");
let fetch = require("node-fetch");
let chalk = require("chalk");


const mdLinks = {};

function findFile() {
  //console.log("process ", process.argv);
  let index = process.argv.indexOf("--file");
  if (index < 0) {
     return console.log("Necesitas usar la flag --file con un uri valido");
  } else {
    let uri = process.argv[index + 1];
    //console.log("uri ", uri);
    let fileExt = path.extname(uri);
   
    //console.log("extension ", fileExt);
    if (fileExt === ".md") {
      readFiles(uri);
      return uri;
    } else {
      return console.log("por favor ingresa un archivo con esxtensión '.md'");
    }
  
  } 
  
}


function readFiles(uri) {
  let fileContent = fs.readFileSync(uri, "utf-8");
  //console.log("todo el texto aqui ", fileContent)
  getLinks(fileContent, uri);
  return fileContent;
}

function getLinks(fileContent, uri) {
  let regexMarkdown = /\[(.+)\]\s(https?:.+?\S+)/gim; //obtiene las etiquetas y links sin parentesis
  let regexURL = /https?:.+?\S+/gim;
  let regexLabel = /\[(.+)\]\s/gim; //este regex trae todo lo que tenga []
  let deleteBrackets = fileContent.replace(/[\(\)]/gim, " "); //aqui quitamos los parentesis y ponemos espacios
  let matchMd = deleteBrackets.match(regexMarkdown); //trae los que coincidan con etiquetas y links
  let matchURL = deleteBrackets.match(regexURL); //trae solo los links
   consultLinks(matchMd, uri, regexURL, regexLabel);
   return matchMd;
}

function consultLinks(matchMd, uri, regexURL, regexLabel) {
  let arrayN = [];
  matchMd.forEach((element) => {
    let links = element.match(regexURL);
    let urls = element.match(regexLabel);
    let newObjet = {
      href: links,
      label: urls,
      path: uri,
    };
    arrayN.push(newObjet);
  });

  let flagValidate = process.argv.indexOf("--validate");
  let flagStats = process.argv.indexOf("--stats");

  if (flagValidate > 0 || flagStats > 0) {
    getInfoLink(arrayN, flagValidate, flagStats);
   
    
  } else {
    //consultLinks(matchMd, uri, regexURL, regexLabel)
    return console.log(
      arrayN,
      "\nSe encontraron ",
      arrayN.length,
      " links en el archivo"
    );
  }
}

function getInfoLink(arrayN, flagValidate, flagStats) {
  //console.log("Los links: ", arrayN)
  let succes =0;
  let broke =0;
  let arrayS = [];
  let arrFail = [];
  let links = arrayN.map((link) => {
    fetch(link.href)
      .then((res) => {
        let object = {
          // si esta ok o fail
          href: res.url,
          label: link.label,
          status: res.status,
          statusText: res.statusText,
        };
        arrayS.push(object);
                
        newValidate(object, flagValidate);
      })

      .catch((err) => {
        let objetFail = err.message;
        if (objetFail !== null) {
          //console.log("Error de conexión :", chalk.bgYellow(chalk.black(`${objetFail}`)));
        }
        arrFail.push(objetFail);

        if(arrayS.length +arrFail.length === arrayN.length){
          newStats(flagStats,arrayN,arrFail,arrayS,succes,broke);
        }
            });
        });
}

function newValidate(object, flagValidate) {
   if (flagValidate > 0) {
    if (object.status === 200) {
      return console.log(`${object.label}`, chalk.bgBlue(`✔ ${object.statusText}`));
    } else {
      return console.log(`${object.label}`, chalk.bgRed(`X ${object.statusText}`));
    }
  }
}

function newStats(flagStats,arrayN,arrFail,arrayS,succes,broke) {
  if (flagStats > 0) {
   
       arrayS.map((link) => {
      if (link.status===404){
        broke++;
      }else{
          succes++;
      }
    });
    
    
    /* console.log("Links totales en el archivo",arrayN.length)
    console.log("Links validados ",arrayS.length)
    console.log("Links con error de conexion en fetch",arrFail.length)
    console.log("status 200 ", succes)
    console.log("404", broke) */

    if( arrayN.length ===arrFail.length+arrayS.length){
      //console.log("vamo bien")
      return console.log(chalk.bgCyan((chalk.black(`Links Totales: ${arrayN.length}\n`)), 
                         chalk.bgGreen(chalk.black(`Links trabanjando de manera correcta: ${succes} \n`)),
                         chalk.bgYellow(chalk.black(`Error de conexion con fecth: ${arrFail.length} \n`)),
                         chalk.bgRed(chalk.black((`Links no encontrados : ${broke} \n`)))))
      
    }
   
}
}




findFile();

mdLinks.findFile = findFile;
mdLinks.readFiles = readFiles;
mdLinks.getLinks = getLinks;
mdLinks.consultLinks = consultLinks;
mdLinks.getInfoLink = getInfoLink;
mdLinks.newValidate = newValidate;
mdLinks.newStats = newStats;

module.exports = mdLinks;
