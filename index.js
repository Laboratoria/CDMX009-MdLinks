let fs = require('fs')
let index = process.argv.indexOf("--file")
let uri = process.argv[index+1]
let fetch = require ('node-fetch')
let colors = require ("colors")


// read file
function readMd (uri){
  let readString = fs.readFileSync(uri, 'utf-8')
  return `${readString}`
}
// get links
function getLinks(uri){
  let links = readMd(uri)
  let regEx = /\bhttps:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_$#\/]+)([.a-z0-9]+)/gi
  let arrayLinks = links.match(regEx);
  return arrayLinks
}
// Validar links
let totalLinksValidate =[]
function validateLinks(uri){
  let readlinks = getLinks(uri)
  let promises = readlinks.map(link => fetch(link)
    .then(result =>{
      totalLinksValidate.push(({ url:result.url, status:result.status, boolean: true }))
    })
    .catch(err => {
      totalLinksValidate.push(({url:link, status:'Error', text: err.message, boolean: false }))
    })
  )
  
  return Promise.all(promises)
          .then(result =>{
            totalLinksValidate.reduce((accountant, elem) =>{
              if (elem.status!== 200){
                console.log(colors.yellow(elem));
              }
              if (elem.status === 200){
                console.log(colors.green(elem));
              }
            }) 
          })
}
validateLinks(uri)

// contar links
let totalLinksCounted =[]
function counterLinks(uri){
  let readlinks = getLinks(uri)
  let promises = readlinks.map(link => fetch(link)
    .then(result =>{
      totalLinksCounted.push(({ url:result.url, status:result.status, boolean: true }))
    })
    .catch(err => {
      totalLinksCounted.push(({url:link, status:'Error', text: err.message, boolean: false }))
    })
  )
  
  return Promise.all(promises)
          .then(result =>{
            console.log('total: ', totalLinksCounted.length);
            console.log('Rechazados ',totalLinksCounted.reduce((accountant, elem) =>{
              if (elem.status !== 200){
                return accountant += 1
              }
              return accountant
            },0));
            console.log('Buenos ', totalLinksCounted.reduce((accountant, elem) =>{
              if (elem.status === 200){
                return accountant +=1
              }
              return accountant
            },0));
            return result
          })
}
counterLinks(uri)


module.exports = { readMd }