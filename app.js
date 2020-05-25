#!/usr/bin/env node
const fs = require('fs');
const path = require('path'); 
const https = require('https');
let file;
let string;

//Find file
const indexFile = () => {
  let fileFlag = process.argv.indexOf('--file');
  file = process.argv[fileFlag + 1];
  return console.log('file:', file);
}
indexFile();

//Read file
  const readFile = () => {
  string = fs.readFileSync(file, 'utf8');
  return string;
};

//Find the md path file
let pathFile = path.extname(file); 
  if (pathFile === '.md'){
    console.log('path:', pathFile);
    readFile();
  }
  else {
    console.log('path:', 'this is not a md file');
  }
//console.log('path:', pathFile) 

//Find links
const fileLinks = () => {
  let matches = string.match(/\bhttps?:\/\/\S+/gi);
  console.log('match:', matches);
}
fileLinks();

module.exports = indexFile;



