const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const colors= require('colors');

let index = process.argv.indexOf("--file");
let flags = process.argv;

function getFile(){
    let uri = process.argv[index +1];
    let extension = path.extname(uri);
     if(index < 0){
         console.log('You need to enter the flag --file and path of the file with extension .md'.green);
         return false;
     }else if (extension != '.md') {
         console.log('Please enter file with extension markdown'.red);
         return false;
     }else{
         return uri;
     }
};

function readFile (uri){
 let string = fs.readFileSync(uri,'utf-8');
 return string;
}

