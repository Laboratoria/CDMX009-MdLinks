const https = require('https');
const fetch = require('node-fetch')


let valid = []
let invalid = []
let totals = 0

function promiseResolved (res, link, isError) {
  if(isError){
      invalid.push({status:"FetchError", link}) 
  } else   valid.push({status:res.status, link}) // else if < 400 || 400 invalid
  
  if(valid.length + invalid.length >= totals) {
  return console.log(valid)
}
}

function validate (links){
    totals = links.length -1
    links.forEach(link=>fetch(link)
        .then(res=>promiseResolved(res,link,false))
        .catch(e=>promiseResolved(e,link,true)))

// // el único problema es que los que fallan no sabemos ni cual es el link    let con = 0
//     let clean = res.map(el=>{
//         console.log(el)
//         // estan como undefined en el value los que nos faltan
//         if(el.value) {
//             return ({
//                 status: el.value.status,
//                 text: el.value.statusText,
//                 link: el.value.url
//             })
//         } else{
//             return "error"
//         }
//     }).filter(el=>el!=="error")
//     console.log(clean) // estamos seguras de que termino

}
module.exports = {
    validate,
}

    // console.log(results)
    // console.log(results)// esto puede fallar porque el push vive dentro de un callback
// 1.- probar este codigo y ver qu)e resulta
// 2.- peensar cómo podemos esperar a que los links se comprueben antes del return results
// 3.- leer la docu de https para ver si existe un metodo sync
// 4.- funcionarioa si uso async /await ?