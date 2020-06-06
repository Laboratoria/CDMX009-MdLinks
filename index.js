let fs = require ('fs')
const fetch = require('node-fetch')
//const colors = require('colors')
const path = require('path');

function init() {
    let index = process.argv.indexOf('--file')
    let uri = process.argv[index + 1]
    if (index<0) {
      console.log('Use the flag --file before your path, hommie')
      return false
    }
    else if (path.extname(uri) != '.md'){ 
      console.log('Ths is not a markdown file')
      return false 
    }
    else if (path.extname(uri) === '.md') { 
      let string = fs.readFileSync(uri, 'utf8')
      //console.log(uri)
      return string
    }
    else{  
      console.log('Something´s wrong try again baby :( ')
      return false
    }
}

function findLink(string) { 
    let file = (`Content:${string.toString()}`)
    let regexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    let links = file.match(regexp)
    //console.log(links)
    return links
}


function array(links) { 
    const results = links.map(link => fetch(link)
    .then( res  => {
        if(res.status == 200){
            //console.log(`${link} good one baby of light`.underline.brightGreen)
            let goodResult = `url: ${link} status: ${res.status} text: ${res.statusText}`
            return goodResult
        }
        else if (res.status == 404){
            //console.log(`${link} bad one, get angry`.underline.brightRed)
            let badResult = `url: ${link} status: ${res.status} text: ${res.statusText}`
            return badResult
        }
    })
    .catch(
     error => {
        console.log(`${error.url} bad one, get angry`.underline.brightRed)
    })
    )
    return results
   };
   
async function validate(results){
    //const validateResults = []
    const validations = await Promise.all(results)
    .then(res => {
        //console.log(`${res}`) 
        return res  
     })
    //  validateResults.push(validations) 
    //  console.log(validateResults)
    //  return validateResults
    //console.log(validations)
    return validations    
}

async function stats (array){
    const validations = await Promise.all(array)
    .then(res => {
        console.log("✔ Total Links:",res.length)
    //console.log(array)
        console.log("✔ Total Working Links: ",res.reduce((acc, el)=>{
            //console.log(el.status === 200)
                if(el.status === 200 && true){      
                return acc += 1
              }
              return acc += 1
          },0))
        console.log("✖ Total Broken links: ",res.reduce((acc, el)=>{
            //console.log(el.status === 404)
                if(el.status === 404){
                let brokenLinks = el.map(broken)
                function broken (){
                    el.status === 404
                }
                
                return brokenLinks.length
            }
            return acc  += 1       
          },0))
        return res
    })
    

          return validations
}





let validateLink =() => {
 let ejecutar = init()
 let arreglo = findLink(ejecutar)
 let check =  array (arreglo)
 let xxx=  validate(check)
 let jj= stats(check)
 return jj
}
validateLink();