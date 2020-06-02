#! / usr / bin / env nodo
const funciones = require("./index.js")
const chalk = require('chalk');

const mdLinks = function(routeFile, validate) {
  return new Promise(async (resolve, reject) => {
     
     try {
        let cadenaFile = await funciones.readFile(routeFile)
        let arrayLinks = funciones.procesarFile(cadenaFile, routeFile)
        return resolve(validate ? funciones.validateLinks(arrayLinks) : arrayLinks);

     } catch(error) {
         console.log(chalk.magenta(error))
        return reject("No se pudo completar la operacion. "+ error);
     }
  })
}

module.exports = {
   mdLinks
 }

