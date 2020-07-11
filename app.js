#!/usr/bin/env node
const fs= require ("fs");
const path = require("path");
const fetch= require("node-fetch");
let options= process.argv;

let index = process.argv.indexOf("--file");    
let pathFileArg = process.argv[index +1];


 function validateExt(pathFile) {
    try {
        let ext= (path.extname(pathFile));            
        return  ext === '.md' 
    } catch (e) {
        return false
    }    
 }


function readMdFile(pathFile) {          
    const data = fs.readFileSync(pathFile, 'utf-8')
    return data; 
}  


function getLinks(data) {
    let string= data;  
    let regExp= (/https?:\S+\w/gi);
    let links= string.match(regExp);
    return links    
}       

let linkok =[]
let okLinks = [] 
let blink=[]
let broken = [] 

function statusLink(links) {    
    let i=0        
    let j=0  
    let promises =links.map( link =>fetch(link)
        .then(res=> { 
            linkok= {
                href:res.url,
                statusText:res.statusText,
                status:res.status,                           
                file:pathFileArg          
            }

            if (linkok.status===200){
                okLinks.push(linkok)
                return i++
            }
            if (linkok.status!==200){
                broken.push(linkok)
                return   j++
            } 
        })
        .catch(err=>{          
            blink={          
                url:link,
                error:err.code,
                status:err.status,
                file:pathFileArg 
            }
            if (blink.status!==200){
                broken.push(blink)
                return j++
            }
        }))
        
        return Promise.all(promises) 
        .then(results => ({
              Total: results.length,
              Ok: i,
              Broken: j,            
        })
        ) 
}


function main (pathFile) {
    if (validateExt(pathFile)) {
        const data = readMdFile(pathFile);
        const links= getLinks(data);
        console.log("Links encontrados:",links)
        return statusLink(links)       
    } else {
        return Promise.reject('El archivo no está en formato md'); 
    } 
}

main(pathFileArg)
.then((result) => {    
    if (options.includes('--validate') && options.includes('--stats')) {
        console.log(result)
        console.log("OK Links:",okLinks)
        console.log("Broken Links:",broken)
    }else if(options.includes('--validate')){       
        console.log("OK Links:",okLinks)
        console.log("Broken Links:",broken)
    } else if(options.includes ('--stats')){
        console.log(result)
    }       
})
.catch(e=> {
    console.log(e)
  });;