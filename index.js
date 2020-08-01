const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const colors = require('colors/safe')


//Función que desencadena todo el proceso (valida si el archivo tiene terminación .md)
function validateFile(file,options){
    if(path.extname(file) === '.md'){
        readFile(file,options)
    }else{
        console.log(colors.magenta.bold('*****Introduce un archivo con una extensión válida(.md)*****'))
    }
}

//Leyendo archivo, generando string
function readFile(file,options){
    const string = fs.readFileSync(file, 'utf-8')
    getLinks(string,options)
}

//Obteniendo links
function getLinks(string,options){
//let expReg = (/https?:\S+\w/gi)
    const expReg = /(https?:)([\w\.\/\-\#\?\=\&]+)/g
    const links = string.match(expReg)
   // console.log('Listado de links', links)
        if(options==="validateAndStats"){
            validateAndStats(links)
        }else if(options==="validate"){
            onlyValidate(links)
        }else if(options==="stats"){
            onlyStats(links)
        }
}

//Validando los links y obteniendo estadísticos
function validateAndStats(links){ 
    let promises = links.map(link => fetch(link)
        .then (res => {
        let resp = {
            url: res.url,
            status: res.status,
            text: res.statusText
        }
        if(resp.status === 200){
            console.log(colors.magenta(res.status), colors.cyan(res.statusText), ('url:', link))
        }else{
            console.log(colors.yellow(res.status), colors.green(res.statusText),('url:', link))
        }
        return resp
    })
    .catch (error => {
        let err = {
            url: link,
            status: 'error',
            text: error.errno
        }
        if(err.status === 'error'){
            console.log(colors.yellow(err.status), colors.green(err.text), ('url:', link))
        }
        return err
    })
    )
    return Promise.all(promises)
    .then(res => statsLinksValidate(res))
}

function statsLinksValidate (res){
    console.log(colors.rainbow('Total links: '), (res.length))
    console.log(colors.magenta.bold('Broken links: ', res.reduce((accountant, element) => {
        if (element.status !== 200){
            return accountant += 1
          }
          return accountant
        },0)))
    console.log(colors.green.bold('Functional links: ', res.reduce((accountant, elemento) => {
        if (elemento.status === 200){
            return accountant += 1
          }
          return accountant
        },0)))

    return res
}

//Obteniendo solamente los links
function onlyValidate(links){ 
    let promises = links.map(link => fetch(link)
        .then (res => {
        let resp = {
            url: res.url,
            status: res.status,
            text: res.statusText
        }
            if(resp.status === 200){
                console.log(colors.magenta(res.status), colors.cyan(res.statusText), ('url:', link))
            }else{
                console.log(colors.yellow(res.status), colors.green(res.statusText),('url:', link))
            }
            return resp
    })  
    .catch (error => {
        let err = {
            url: link,
            status: 'error',
            text: error.errno
        }
            if(err.status === 'error'){
                console.log(colors.yellow(err.status), colors.green(err.text), ('url:', link))
            }
            return err
    })
    )
    return Promise.all(promises)
}

//Obteniendo sólo los estadísticos
function onlyStats(links){ 
    let promises = links.map(link => fetch(link)
   .then(res => ({url: link, status: res.status, text:res.statusText}))
   .catch(err=>({url: link, status: 'error', error:err.message}))
   )
    return Promise.all(promises)
    //Todos los resultados, para sacar stats, hay que contarlos
    .then(res => {statsLinksValidate(res)})
}



module.exports = {
    readFile,
    validateFile
}
