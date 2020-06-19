#!/usr/bin/env node

const argv=require('./commands').argv
const colors = require('colors/safe')
const { readFile,validateFile} = require('./index.js')
//Se utiliza la información de la posición 0 del process.argv()
const command=argv._[0]


//Switch evalúa cada caso que se ejecute en la posición 0 del arreglo process.argv 
switch(command){
  case 'validate':
    console.log(colors.yellow.bold('***** V A L I D A T E D  L I N K S ******'))
    //validateLinks(argv.file)
    readFile(argv.file,"validate")
    break;
  case 'stats':
    console.log(colors.yellow.bold('***** S T A T S ******'))
    readFile(argv.file,"stats")
    break;
  case 'validate-stats':
    console.log(colors.yellow.bold('***** V A L I D A T E D  L I N K S  &  S T A T S ******'))
    validateFile(argv.file,"validateAndStats")
    break;
  default:
    console.log(colors.yellow.bold('***** ¿ N E E D  H E L P ?  --help ******'))
}