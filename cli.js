#!/usr/bin/env node
const argv=require('./commands').argv
const colors = require('colors/safe')
const { validateLinks, statsLinks, validateAndStats } = require('./async.js')
//Se utiliza la información de la posición 0 del process.argv()
const command=argv._[0]


/* function ejemplofuncion(parametro){
  console.log(`${parametro}`,"Aqui se imprime el nombre del archivo")
} */

//Switch evalúa cada caso que se ejecute en la posición 0 del arreglo process.argv 
switch(command){
  case 'validate':
    //ejemplofuncion(argv.file)
    //validateLinks(argv.file)
    //console.log(colors.yellow('***** V A L I D A N D O ******'))
    validateLinks(argv.file)
    break;
  case 'stats':
    //console.log('Obteniendo estadísticos')
    statsLinks(argv.file)
    break;
  case 'validate-stats':
    validateAndStats(argv.file)
    //console.log('Estadísticos y links validados')
  default:
    console.log("Ayuda con --help")
}

//crear los siguientes casos
//llamar a tus 3 funciones 
//pasarle el parametro a tus funciones  argv.file