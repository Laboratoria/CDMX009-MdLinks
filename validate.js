const fetch = require('node-fetch')

let validated = [];

function validate(links){
    let promises = links.map(link=>fetch(link)
                                    .then(res=> validated.push(({url: link,text:res.statusText,status:res.status, boolean:true })))
                                    .catch(err=>validated.push(({url: link,status:"Error",text:err.message, boolean: false})))) 
    return Promise.all(promises)
        .then(results=>{
            console.log("total:",validated.length);
            console.log("Buenos: ",validated.reduce((acc, el)=>{
                if(el.status<400) return acc+=1
                return acc
            },0))
            console.log("Malos: ",validated.reduce((acc, el)=>{
                 if(el.status>=400 || el.status==="Error") return acc+=1
                 return acc
             },0))
          return results
        })
}

module.exports = {
    validate,
}

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
    // console.log(results)
    // console.log(results)// esto puede fallar porque el push vive dentro de un callback
// 1.- probar este codigo y ver qu)e resulta
// 2.- peensar cómo podemos esperar a que los links se comprueben antes del return results
// 3.- leer la docu de https para ver si existe un metodo sync
// 4.- funcionarioa si uso async /await ?





// function stats (array){
//     array.status < 400
// }

// let valid = []
// let invalid = []
// let totals = 0

// function promiseResolved (res, link, isError) {
//   if(isError || res.status >= 400){
//       invalid.push({status:"FetchError" || res.status, link}) 
//   } else if (res.status < 400)  valid.push({status:res.status, link}) // else if < 400 || 400 invalid
  
//   if(valid.length + invalid.length >= totals) {
//   return console.log(valid.length, invalid.length)
// }
// }

// function validate (links){
//     totals = links.length -1
//     links.forEach(link=>fetch(link)
//         .then(res=>promiseResolved(res,link,false))
//         .catch(e=>promiseResolved(e,link,true)))
// }