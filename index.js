const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const colors = require('colors/safe')


//Funcion para encontrar el archivo

/* function findFile(){
    const index = process.argv.indexOf ('--file')
    console.log(index)
    const uri = process.argv[index+1]
}
findFile(); */

function findFile(){
    const array = process.argv
    const uri = process.argv.slice(array.length-1).toString()
    //console.log(process.argv) 
    //console.log(uri)
   /*  if(path.extname(uri) === '.md'){
        readFile(uri)
    }else{
        console.log('No se puede leer el archivo')
    } */
    path.extname(uri) === '.md' ? readFile(uri) : console.log(colors.magenta.bold('*****Introduce un archivo con una extensión válida(.md)*****'))
}

findFile()


function readFile(uri){
    const string = fs.readFileSync(uri, 'utf-8')
    //console.log(string)
    getLinks(string)
}

function getLinks(string){
//let expReg = /(https?:\/\/)([\w\.\/\-\#]+)/g
    const expReg = /(https?:)([\w\.\/\-\#\?\=\&]+)/g
    const links = string.match(expReg)
    console.log('**********************linkssss********************** ', links)
    /* fetch(links).then (function(res){
        console.log(res)
    }) */
    validate(links)
}


function validate(links){
    let fetchPromises = links.map(link => {
        fetch(link)
        .then (res => {
            //console.log(res)
            let resp = {
                url: res.url,
                status: res.status,
                text: res.statusText
            }
            console.log(resp)
            })
        .catch (error => {
            //console.log(error)
            let err = {
                url: error.message,
                status: 'error',
                error: error.errno
            }
            console.log(err)
            })
        })
}













/* function fetchResponse(links){
    let fetchPromises = links.map(link=>fetch(link))
    return Promise.all(fetchPromises)

        .then (function(res){
            //console.log(res)
            let resp = {
                url: res.url,
                status: res.status,
                text: res.statusText
            }
            console.log(resp)
            })
        
} */







/* function fetchResponse(links){
   let allFetchs = Promise.all(links.map(link => fetch(link)))
   return allFetchs.then(res => console.log(res))    
} */






/* 
El método fetch() toma un argumento obligatorio, la ruta de acceso al recurso que desea recuperar. Devuelve una Promise que resuelve en Response a esa petición, sea o no correcta. Una vez que Response es recuperada, hay varios métodos disponibles para definir cuál es el contenido del cuerpo y como se debe manejar.
Objetos Response
Cómo has visto anteriormente, las instancias de Response son devueltas cuando fetch() es resuelto.

Las propiedades de response que usarás son:

Response.status — Entero (por defecto con valor 200) que contiene el código de estado de las respuesta.
Response.statusText — Cadena (con valor por defecto "OK"), el cual corresponde al mensaje del estado de código HTTP.
Response.ok — Visto en uso anteriormente, es una clave para comprobar que el estado está dentro del rango 200-299 (ambos incluidos). Este devuelve un valor Boolean, siendo true si lo anterior se cumple y false en otro caso.
*/

