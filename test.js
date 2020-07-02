#!/usr/bin/env node
const fs= require ("fs");
const path = require("path");
const fetch= require("node-fetch");
// let options= process.argv;

let index = process.argv.indexOf("--file");    
let pathFileArg = process.argv[index +1];


 function validateExt(pathFile) {
    try {
        let ext= (path.extname(pathFile));            
        return  ext === '.md' 
    } catch (e) {
        return false
    }
    
 }


function readMdFile(pathFile) {          
    const data = fs.readFileSync(pathFile, 'utf-8')
    return data; 
}  




function getLinks(data) {
    let string= data;  
    let regExp= (/https?:\S+\w/gi);
    let links= string.match(regExp);
    return links
    
}       
 

function statusLink(links) {
    let okLinks = []        
    let broken = []        
    let i=0        
    let j=0
    let link =[]
    let blink=[]

    let promises =links.map( link =>fetch(link)
        .then(res=> { 
            link= {
                href:res.url,
                statusText:res.statusText,
                status:res.status,                           
                file:pathFileArg          
            }

            if (link.status===200){
                okLinks.push(link)
                return i++
            }
            if (link.status!==200){
                broken.push(link)
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
              count: results.length,
              unique: i,
              broken: j,
          })
        )
}



function main (pathFile) {
    if (validateExt(pathFile)) {
        const data = readMdFile(pathFile);
        const links= getLinks(data);
        return statusLink(links)
            
    } else {
        return Promise.reject('El archivo no está en formato md'); 
    } 
}

main(pathFileArg)
.then((result) => {
    console.log(`Total links: ${result.count} Total Oklinks: ${result.unique} Broken links: ${result.broken}`)
})
.catch(e=> {
    console.log(e)
  });;