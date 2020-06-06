#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
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
         return uri;    
     }
};


  function readFile(uri){
   let fileMd = fs.readFileSync(uri,'utf-8');
   return fileMd; 
  }

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
    return linksArr;
}
 
    function validateLinks(linksArr, uri) {
       const linksValid= linksArr.map(link => {
       return fetch(link.href)
        .then(res => {
            if(res.status === 200){
                console.log(`Href: ${res.url}  Status: ${res.status} OK ✓`.green);   
            }else{
                console.log(`Href: ${res.url}  Status: ${res.status} Fail ✕`.red);    
            }
        }).catch(error =>{
            console.log(`Don´t find link: ${res.url}`);
        })
       })
       return linksValid;
   };

   function stats(linksArr, uri){
      let totalLinks= linksArr.length;
      let uniqueLinks = [...new Set (linksArr.map(links => links.href))].length;

      console.log(`The file ${uri} consists of the following: \n`);
      console.log(`-- Total: ${totalLinks}`);
      console.log(`-- Unique: ${uniqueLinks}`);
   };

   function validateAndStats(linksArr, uri){
     let links = linksArr;
     let totalLinks = linksArr.length;
     let uniqueLinks = [...new Set(linksArr.map(links => links.href))].length;
     let brokenLinks = 0;
     let promises = [];

     links.forEach(link => {
         let promise = fetch(link.href)
          .then(res =>{
              if(res.status != 200){
                  brokenLinks++;
              }
          })
          promises.push(promise)
     })
     return Promise.all(promises)
     .then(()=>{
         console.log(`The file ${uri}  consists of the following: \n`);
         console.log(`-- Total: ${totalLinks}`);
         console.log(`-- Unique: ${uniqueLinks}`);
         console.log(`-- Broken: ${brokenLinks}`);
         return brokenLinks;
     })
   };
   
async function route(){
   let uri = getFile();
    if(uri != false){
        let fileMd = readFile(uri);
        if(fileMd != false){
            let linksArr = searchLinks(fileMd, uri);
            if(linksArr.length <= 0){
                return console.log(`Sorry the file ${uri} has no links`);
            }if(flags.includes('--validate') && flags.includes('--stats') || flags.includes('--v') &&flags.includes('--s')){
                validateAndStats(linksArr, uri);
            }else if(flags.includes('--validate') || flags.includes('--v')){
                validateLinks(linksArr, uri);
            }else if(flags.includes ('--stats') || flags.includes('--s')){
                stats(linksArr, uri);
            }else{
                if(linksArr != '')
                console.log(`The file ${uri} conteint links: \n`);
                linksArr.forEach(link => {
                    console.log(`-- ${link.href} ${link.title}`);
                })
            }
        }
    }
};

route();


module.exports = {
 getFile,
 readFile,
 searchLinks,
 validateLinks,
 stats,
 validateAndStats
}