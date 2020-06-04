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
//console.log(readFile(uri));


// get links
function getLinks(uri){
  let links = readMd(uri)
  let regEx = /\bhttps:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_$#\/]+)([.a-z0-9]+)/gi
  let arrayLinks = links.match(regEx);
  return arrayLinks
}
//console.log(getLinks(uri));

// Validar links
let totalLinks =[]
function validateLinks(uri){
  let readlinks = getLinks(uri)
  let promises = readlinks.map(link => fetch(link)
    .then(result =>{
      totalLinks.push(({ url:result.url, status:result.status, boolean: true }))
    })
    .catch(err => {
      totalLinks.push(({url:link, status:'Error', text: err.message, boolean: false }))
    })
  )
  
  return Promise.all(promises)
          .then(result =>{
            console.log('total: ', totalLinks.length);
            console.log('Rechazados ',totalLinks.reduce((accountant, elem) =>{
              if (elem.status !== 200){
                console.log(colors.yellow(elem)) 
                return accountant += 1
              }
              return accountant
            },0));
            console.log('Buenos ', totalLinks.reduce((accountant, elem) =>{
              if (elem.status === 200){
                console.log(colors.red(elem))
                return accountant +=1
              }
              return accountant
            },0));
            return result
          })
}
validateLinks(uri)


module.exports = { readMd }