#!/usr/bin/env node

const fs= require ("fs");
const path = require("path");
const fetch= require("node-fetch");
let options= process.argv;
  let index = process.argv.indexOf("--file");
  let pathFile = process.argv[index +1];
        
// let pathFile= "README.md"
// let pathFile= process.argv[2];
let ext= (path.extname(pathFile));
// console.log("path",pathFile);
// verifica que sea un archivo md

if (ext === '.md') {
    console.log('el archivo es formato md');    
} 
else console.log('el archivo no esta en formato md'); 
// lee el archivo
// const rdFile = (pathFile) => {
    
    fs.readFile(pathFile, 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
        // recorrer archivo y buscar links
      console.log("no hay error de lectura");
        let string= data;  
        let regExp= (/https?:\S+\w/gi);
        let links= string.match(regExp);
        console.log(links)
        // console.log(links, "Total links:" ,links.length);

// verifica el status del link y lo imprime en consola
           
        let okLinks = []
        let broken = []
        let i=0
        let j=0
        let link =[];

      let promises =links.map( link =>fetch(link)
        .then(res=> {
           link= {
            href:res.url,
            statusText:res.statusText,
            status:res.status,                           
            file:pathFile          
          }
          if (link.status===200){
            okLinks.push(link)
            if(options.includes('--validate') ){
              console.log(link);
            console.log("bbbbbbbb href:",link.href,"file:",link.file)
          }
            return   i++          
        }
          if (link.status!==200){
          broken.push(link)
          if(options.includes('--validate') ){
            console.log(link);
        } else{
          console.log("href:",link.href,"file:",link.file)
        }
          // console.log(link)
          return   j++          
        }
      
        })       
        .catch(err=>{          
         let blink={          
          url:link,
          error:err.code,
          status:err.status,
          file:pathFile 
        }
        if (blink.status!==200){
          broken.push(blink)
          if(options.includes('--validate') ){
            console.log(blink);
        } else{
          console.log('xxxxxx', blink);
          console.log("cccc href:",blink.url,"file:",blink.file)
        }
          console.log(blink)
          return   j++          
      }
      }))
        Promise.all(promises) 
        .then(results=>
          
          console.log("Total links:", results.length, "Total Oklinks:", i, "Broken links:", j)
         
                )
        .catch(e=> {
          console.log('aaaaaaaaaaaaaaa')
          console.log(e)
        })
        }});
       