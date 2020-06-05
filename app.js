const fs = require('fs')
const fetch = require('node-fetch')
const colors = require('colors')

console.log("Natalia Olmos / Proyecto MDLINKS /Laboratoria CDMX009")

function getContentString() {

    let index = process.argv.indexOf("--file")
    if (index < 0) return console.log("You need to use a valid uri flag --file")
    let uri = process.argv[index + 1]
    let string = fs.readFileSync(uri, 'utf8')
    return string
}

function getLinks(string) {

    const getArray = ("Text: ", string.toString());
    let regExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return getArray.match(regExpression);
}

function validateLinks(arrayLinks) {
        let i=0
        let work = 0
        let broke = 0
        fetch(arrayLinks[i]).then(function(response) {
            for(var i = 0; i >= response.length; i++){
  
            if (response.status === 200) {
                work += 1;
    
            }else if (response.status === 404) {
                broke +=1;
    
            }}
            console.log(`funciona:${work} roto:${broke} total:${promises.length}`)
            return `funciona:${work} roto:${broke} total:${arrayLinks.length}`
          }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });

    let promises = arrayLinks.map(aLink => fetch(aLink)
            .then(response => { 
                return {
                    url: response.url,
                    status: response.status,
                    text: response.statusText
                }
            })
            .catch(
                error => {
                    return { error: error.message }
                    
                })
        )
    return Promise.all(promises) 
        .then(result => result) 
};

let main = async() => { 
    let string = getContentString()
    let links = getLinks(string) 
 
    let shouldValidate = process.argv.indexOf('--validate')
    let shouldShowTotals = process.argv.indexOf('--stats')
    if (shouldValidate > -1) {
        let results = await validateLinks(links) 
        console.log(results) // le muestro la validación
        if (shouldShowTotals > -1) {
            // contar
            // muestro results
        }
    }
    // el user quiere ver totales?
}
main();