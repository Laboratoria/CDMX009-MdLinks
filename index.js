const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const colors = require('colors/safe')




//Encontrar el archivo
function findFile(){
   /*  const array = process.argv
    const uri = process.argv.slice(array.length-1).toString() */
    const index = process.argv.indexOf ('--file')
    //console.log(index)
    const uri = process.argv[index+1]
    path.extname(uri) === '.md' ? readFile(uri) : console.log(colors.magenta.bold('*****Introduce un archivo con una extensión válida(.md)*****'))
}
findFile()

//Leer archivo
function readFile(uri){
    const string = fs.readFileSync(uri, 'utf-8')
    //console.log(string)
    getLinks(string)
}

//Obtener links
function getLinks(string){
//let expReg = (/https?:\S+\w/gi)
    const expReg = /(https?:)([\w\.\/\-\#\?\=\&]+)/g
    const links = string.match(expReg)
   // console.log('**********************linkssss********************** ', links)
    validate(links)
}


//Validar los links
function validate(links){ 
    let promises = links.map(link => fetch(link)
   //.then(res => ({url: link, status: res.status, text:res.statusText}))
        
        .then (res => {
        //console.log(res)
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
        // console.log (resp.url)
    })
    

    //.catch(err=>({url: link, status: 'error', error:err.message}))
   
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
        //console.log (err)
    })
    )

    return Promise.all(promises)
    //Todos los resultados, para sacar stats, hay que contarlos
    .then(res => {
        //console.log(res)
        statsLinksValidated(res)
        //return res
    })
}

//Obteniendo estadísticas
function statsLinksValidated (res){
    console.log(colors.rainbow('Links totales: '), (res.length))
    console.log(colors.magenta('Links sin futuro ni porvenir: ', res.reduce((accountant, element) => {
        if (element.status !== 200){
            return accountant += 1
          }
          return accountant
        },0)))
    console.log(colors.green('Links con ilusiones: ', res.reduce((accountant, elemento) => {
        if (elemento.status === 200){
            return accountant += 1
          }
          return accountant
        },0)))

    return res
}


module.exports = {
    readFile,
    getLinks,
    validate, 
    statsLinksValidated
}
