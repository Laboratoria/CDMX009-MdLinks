#!/usr/bin/env node
const fs = require('fs');
let path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');
const colors = require('colors');
let flags = process.argv;

function getFile(){
    let index = process.argv.indexOf("--file");
    let uri = process.argv[index +1];
    let extension = path.extname(uri);
     if(index < 0){
         console.log('You need to enter the flag --file and path of the file with extension .md'.green);
         return false;
     }else if (extension != '.md') {
         console.log('Please enter file with extension markdown'.red);
         return false;
     }else{
         readFile(uri);
         return uri;    
     }
};

getFile();

  function readFile(uri){
   let fileMd = fs.readFileSync(uri,'utf-8');
   searchLinks(fileMd, uri);
   return fileMd; 
  }


  /* function searchLinks(fileMd, uri) {
   let newFile = fileMd.replace(/[\(\)]/g, " ");
   let space=" ";
   let arrNewFile = newFile.split(space);
   let arrLinks = arrNewFile.filter(text => text.includes('http'));
   let objectLinks = {Links: arrLinks, File: uri};
   console.log(objectLinks);
   return objectLinks;
   } */

   function searchLinks(fileMd, uri){
    let linksArr = []
    let renderer = new marked.Renderer() 
    renderer.link = ( href, file, text ) =>{
         linksArr.push({
            href: href,
            title: text.slice(0,50),
            file: uri
        })
    }
    marked(fileMd, { renderer: renderer })
    validateLinks(linksArr,uri);
    return linksArr;
}
 
    function validateLinks(links, uri) {
       const validateLinks= links.map(link => {
       return fetch(link.href)
        .then(res => {
            if(res.status === 200){
                console.log(`Href: ${res.url}  Status: ${res.status} OK ✓`.green);   
            }else{
                console.log(`Href: ${res.url}  Status: ${res.status} Failed ✕`.red);    
            }
        }).catch(error =>{
            console.log(`Don´t find link: ${res.url}`);
        })
       })
       return validateLinks;
   } 

   