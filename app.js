const funciones = require("./index.js")
const chalk = require('chalk');

const argvCommand = require('yargs')
   .command('validate', 'Valida los links que contiene el archivo .md',
         {
            'file': {
               alias: 'f',
               describe: 'Ruta del archivo que contiene links',
               demand: true
             },
             'validateStats': {
               alias: 'v',
               describe: 'Bandera que indica si se validan los links',
               demand: false,
               default:false
             }
         }
      )
   .help()
   .argv

let command = argvCommand._[0];

switch(command) {
   case "validate" :
      mdLinks(argvCommand.file,argvCommand.validateStats)
      .then(data => console.log(data))
      .catch(error => console.log(error))
      break;
   default:
      console.log("comando no permitido")
}

function mdLinks(routeFile, validateStats) {
   return new Promise(async (resolve, reject) => {
      
      try {
         let cadenaFile = await funciones.readFile(routeFile)
         let links = funciones.procesarFile(cadenaFile, routeFile)
         return resolve(validateStats ? funciones.validateLinks(links) : { links, "total":links.length});
 
      } catch(error) {
          console.log(chalk.magenta(error))
         return reject("No se pudo completar la operacion. "+ error);
      }
   })
}