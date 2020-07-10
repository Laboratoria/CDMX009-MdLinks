#!/usr/bin/env node
const fs= require ("fs");
const path = require("path")
const fetch= require("node-fetch");
const { ifError } = require("assert");


let index = process.argv.indexOf("--file");    
let pathFileArg = process.argv[index +1];


let options= process.argv

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
 
let validated=[]  

function statusLink(links) {
    
    let promises =links.map( link =>fetch(link)
        .then(res=> { 
            // let linkok={
            //     href:res.url,
            //     statusText:res.statusText,
            //     status:res.status,                           
            //     file:pathFileArg          
            // }               
            // console.log(linkok) 

            if (link.status===200){
                console.log("Ok Link:",link.url)
                // okLinks.push(linkok)
                // return i++
            }
            if (link.status!==200){
                console.log("Broken Link:", link.url)
                // broken.push(linkok)
                // return   j++
            } 
            validated.push(({ url: link, status: link.status, boolean: true }))            
        })
        .catch(err=>{          
            // blink={          
            //     url:link,
            //     error:err.code,
            //     status:err.status,
            //     file:pathFileArg 
            // }
            // if (blink.status!==200){
            //     broken.push(blink)
            //     return  j++
            // }
            // return blink
            console.log("Broken Link:", link+"Error")
            validated.push(({ url: link, status: "Error", boolean: false }))   
        }))
        return Promise.all(promises) 
        .then(results => {
            // result={
            //   count: results.length,
            //   unique: i,
            //   broken: j,
            // } 
            // console.log(result)
            // return result;
            console.log("Total Links:", validated.length)
            console.log("Malos:", validated.reduce((accountant,element)=>{
                if (element.status !== 200){
                    return accountant +=1
                } 
                    return acountant
            },0))
            console.log("Buenos:", validated.reduce((accountant,element)=>{
                if (element.status === 200){
                    return accountant +=1
                } 
                    return accountant
            },0))
            return results
        }
        )
}

function main (pathFile) {
    if (validateExt(pathFile)) {
        // const option= validate(options);
        const data = readMdFile(pathFileArg);
        const links= getLinks(data); 
        const stats=statusLink(links) 
        console.log(stats)
        
        // if(options.includes('--validate') && options.includes('--stats')){            
        //     // console.log("V&S")
        //     // console.log(links)  
        //     // console.log(stats)
            
        //     // console.log(`Total links: ${stats.count} Total Oklinks: ${stats.unique} Broken links: ${stats.broken}`)
        // }
// else if(options.includes('--validate')){
//             console.log("V")
            
            
        }
//                 else if(options.includes ('--stats')){
// //             console.log("S")
//             // console.log(`Total links: ${result.count} Total Oklinks: ${j} Broken links: ${result.broken}`)
            
//         }   
//         // return statusLink(link)
            
//     } else {
//         return Promise.reject('El archivo no está en formato md'); 
//     } 
}

// const data = readMdFile(pathFileArg);
// const links= getLinks(data);     
// statusLink(links)
main (pathFileArg)

// .then((result) => {
    
//     console.log(`Total links: ${result.count} Total Oklinks: ${result.unique} Broken links: ${result.broken}`)
// })
// .catch(e=> {
//     console.log(e)
//   })
//   ;;

// function validate(options) {
//     if(options.includes('--validate') && options.includes('--stats')){
//         main(pathFile)
//         console.log("V&S", links)
//     }else if(options.includes('--validate')){
//         console.log("V")
//     }else if(options.includes ('--stats')){
//         console.log("S")
//     }    
// }
// validate(options);





  