#!/usr/bin/env node

const fs= require ("fs");
const path = require("path");
const fetch= require("node-fetch");

// let pathFile= process.argv[2];
// let ext= (path.extname(pathFile));
let ext= (path.extname("README.md"));
// verifica que sea un archivo md
// function verifyExt (ext)  {
if (ext === '.md') {
    console.log('el archivo es formato md');    
} 
else console.log('el archivo no esta en formato md'); 

// lee el archivo
// const rdFile = (pathFile) => {
    // fs.readFile(pathFile, 'utf-8', (err, data) => {
    fs.readFile("README.md", 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
        // recorrer archivo y buscar links
      console.log("no hay error de lectura");
        let string= data;  
        let regExp= (/https?:\S+\w/gi);
        let links= string.match(regExp);
        console.log(links, "Total links:" ,links.length);

// verifica el status del link y lo imprime en consola
           
        let okLinks = []
        let broken = []
        let i=0
        let j=0

      let promises =links.map( link =>fetch(link)
        .then(res=> {
          let link= {
            url:res.url,
            statusText:res.statusText,
            status:res.status
          }
          if (link.status===200){
            okLinks.push(link)
            console.log(link)
            return   i++          
        }
          if (link.status!==200){
          broken.push(link)
          console.log(link)
          return   j++          
        }
      
        })       
        .catch(err=>{          
         let blink={          
          url:link,
          error:err.code,
          status:err.status
        }
        if (link.status!==200){
          broken.push(link)
          console.log(link)
          return   j++          
      }
      }))
        Promise.all(promises) 
        .then(results=>
          console.log("Total links:", results.length, "Total Oklinks:", i, "Broken links:", j), 
          
          ) 
        }})