#!/usr/bin/env node

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const utils = require("./utils/utils.js");
const sharidlinks = {};
function findFile() {
  let uri = process.argv[2];
  new Promise((resolve, reject) => {
    if (path.isAbsolute(uri)) {
      let directory = fs.readdirSync(uri, "utf-8");
      let eachDir = directory.forEach((re) => {
        let extFile = path.extname(re);
        if (extFile === ".md") {
          let newDir = path.join(uri, re);
          resolve(searchLinks(newDir));
        }
      });
    }
    if (!path.isAbsolute(uri)) {
      let extFile = path.extname(uri);
      if (extFile != ".md") {
        reject(
          console.log(chalk.red("Ingresa una ruta, ejemplo: md-links some/example.md o --help")));
      } else {
        resolve(searchLinks(uri));
      }
    }
  }).catch((err) => err);
  let help = process.argv.indexOf("--help");
  if (help > 0) 
    return console.log(chalk.magenta("\n Instrucciones :  \n --help : recibe ayuda  \n md-links <path> <options> \n <path> : ruta del archivo o directorio \n <options> : \n --validate: regresa ruta de archivo,link evaluado, status de link ; \n --stats: conteo de los links correctos, links rotos y con error de conexion \n --validate --stats : regresa la estadistica de links encontrados y el estatus de cada uno"));
  

}

function searchLinks(uri) {
  let fileContent = fs.readFileSync(uri, "utf-8");
  let regexMarkdown = /\[(.+)\]\s(https?:.+?\S+)/gim;
  let regexURL = /https?:.+?\S+/gim;
  let regexLabel = /\[(.+)\]\s/gim;
  let deleteBrackets = fileContent.replace(/[\(\)]/gim, " ");
  let matchMd = deleteBrackets.match(regexMarkdown);
  getLinks(matchMd, uri, regexURL, regexLabel);
  return matchMd;
}

function getLinks(matchMd, uri, regexURL, regexLabel) {
  let arrayLinks = [];
  matchMd.forEach((element) => {
    let links = element.match(regexURL);
    let txtLinks = element.match(regexLabel);
    let properties = {
      href: links,
      label: txtLinks,
      path: uri,
    };
    arrayLinks.push(properties);
  });

  let flagValidate = process.argv.indexOf("--validate");
  let flagStats = process.argv.indexOf("--stats");

  if (flagValidate > 0 || flagStats > 0) {
    utils.getInfoLink(arrayLinks, flagValidate, flagStats);
  } else {
    return console.log(
      arrayLinks,
      "\nSe encontraron ",
      arrayLinks.length,
      " links en el archivo"
    );
  }
}

findFile();

sharidlinks.findFile = findFile;
sharidlinks.searchLinks = searchLinks;
sharidlinks.getLinks = getLinks;
module.exports = sharidlinks;
