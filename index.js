const fs = require('fs')
const https = require('https')
const fetch = require('node-fetch');
const chalk = require('chalk')
//function confirmFile (){
let newFile = process.argv.indexOf('--file');
let uri = process.argv[newFile + 1];
let probe = uri.lastIndexOf(".");
let typeFile = uri.slice(probe);
//console.log(typeFile);
if (typeFile === ".md") {
    //console.log ("ahí vámos")
    read(uri) //para leer el archivo
        .then(content => findLinks(content) //para extraer los links
        .then(linksReal=> getStatusLink(linksReal))
           
            ).catch(er=> console.log(er))
}
else { console.log("you need a file with an .md extention ") }
//}
//confirmFile();


function read(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, function (err, content) {
            if (err) {
                return reject(err)
            }
            resolve(content)
        })
    })
}

const findLinks = (datos) => {
    let joinArray= []
    return new Promise((resolve) => {
        let regularE = /(ftp|http|https):\/\/.*\)/gi;
        let noStr= datos;
        let str= noStr.toString();
        let myArray;
        while ((myArray = regularE.exec(str)) !== null) {
            
           // let joinData= myArray[0].replace(")", " ")
           let joinData= {
            link: myArray[0].replace(")", " "),
            
        };
                
            
           
         joinArray.push(joinData);
          
            }
            //console.log(joinArray)
            resolve(joinArray);
            //let linksReal = joinArray.replace(")", " ");
           
        

    })
}

//function getStatusLink (array) {
//
//        const newArray = array.map( (element) => {
//            
//            return new Promise((resolve, reject)=> {
//                
//                fetch(element.Href)
//                .then((res) => {
//                    let object = {
//                        Href: res.url,
//                        Text: element.Text,
//                        Status: res.status,
//                        StatusText: res.statusText
//                        };
//                    resolve(console.log(href + Status));
//                })
//                .catch((err)=>{
//                    reject("Error at element.href fetch", err)
//                })
//            })
//        })
//
//    }

 
function getStatusLink(links) {
    let validLink = 0;
    let brokenLink = 0;
    let erros = 0
    links.map(element => {
        if (process.argv[4] === "--stats" || process.argv[5] === "--stats") {
            fetch(element.link)
                .then((res) => {
                    let object = {
                        href: res.url,
                        status: res.status,
                        statusText: res.statusText
                    };
                    if (object.status === 200) {
                        validLink++;
                    }
                    if (object.status !== 200) {
                        brokenLink++;
                    }
                })
                .then(() => {
                    if (links.length === validLink + brokenLink) {
                return        console.log(chalk.magenta.bold(`Links totales: ${totalLinks = links.length}\n Links corectos:${validLink}\n Links erróneos: ${brokenLink}`))
                    }
                })
                .catch((err) => {
                    let objetFail = err.message
                    if (objetFail !== null) {
                        erros++;
                       return  console.log(chalk.magenta.bold(`Total Links: ${totalLinks = links.length}\n   
                                Right Links :${validLink}\n 
                                Wrong Links : ${brokenLink}\n
                                Connection error : ${erros}   ${objetFail}`))
                    }
                })
        }
        if (process.argv[4] === "--validate" || process.argv[5] === "--validate") {
            fetch(element.link)
                .then((res) => {
                    let object = {
                        href: res.url,
                        status: res.status,
                        statusText: res.statusText
                    };
                   if(object.status===200) { console.log(chalk.green(`${object.href}  ${object.status}  OK `))}
                   if (object.status!==200){console.log(chalk.red(`${object.href}  ${object.status}  BAD `))}
                })
                .catch(err => console.log(err.message))
        }
    })
}

//function workingLinks(links){
//    https.get(links, function (res){
//     
//        console.log(links + 'statusCode:', res.statusCode);
//    })
//}

 //.then(linksReal=> linksReal.map((allLinks) => {
            //    fetch(allLinks)
            //    .then(res => console.log(res.status))
            //            
            //    .catch(err => console.error(err))
            //}))

            //function getStatusLink (array) {
            //for (let i = 0; i < array.length; i++) {
            //    fetch(array[i]).then((response) => {
            //      if (response.status === 400 ) {
            //          console.log(response.href + response.status  +  ' Error en el link')
            //      }
            //      else {  console.log(array.link  + response.status + " Link correcto") }
            //      return response
            //    }).catch((err)=>{
            //        console.log("Error at fetch", err)
            //    })
            //  }
            //}
            //console.log( element.link + res.status)