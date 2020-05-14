#!/usr/bin/env node


//Grab provided args
//const [,, ...args] = process.argv

//Print provided args
//console.log(`Hola ${args}`);
let fs = require('fs');

//Global
let mdFile;

//Find md file
function indexMd (){
let fileFlag = process.argv.indexOf('--file');
mdFile = process.argv[fileFlag + 1];
console.log(mdFile);
return mdFile
};
indexMd()

//Read md file
function readMd () {
   let stringMd = fs.readFileSync(mdFile, 'utf8');
/*    console.log(stringMd);
 */};
readMd();


module.exports = indexMd;
