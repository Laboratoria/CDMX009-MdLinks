let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')
const colors = require('colors')


function getoString() {

    let index = process.argv.indexOf("--file")
    if (index < 0) return console.log("You need to use a valid uri flag --file")
    let uri = process.argv[index + 1]
    let string = fs.readFileSync(uri, 'utf8')
    return string
}


function Links(string) {

    const getArray = ("Text: ", string.toString());
    let regExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return getArray.match(regExpression);
}

function validateLinks(arrayLinks) {
    let i = 0
    let work = 0
    let broke = 0

    for (i = 0; i < arrayLinks.length; i++) {

        fetch(arrayLinks[i]).then(function(response) {
            if (response.status === 200) {
                work++;

            } else if (response.status === 404) {
                broke++;


            } else {
                console.log('error', response.status);
            }
            console.log(`✔ Total Links: ${arrayLinks.length}`.brightYellow);
            console.log(`✔ Total work Links: ${work}`.green);
            console.log(`✖ Total Broken links: ${broke}`.red);

        })

    };

    let promises = arrayLinks.map(aLink => fetch(aLink) // array de promesas
            .then(response => { // resolve de la promesa
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
        // qué devuelve esta función ? ---> UNA ... P...R...O...M...E...S...A
    return Promise.all(promises) // convierte el ARRAY de promesas por un ARRAY de res/rej
        .then(result => result) // array de resultados {url,status,text,error}
        // console.log("las promesas: ", promises)
};

let main = async() => { //  (imperativo ó programacion imperativa)
    let string = getoString()
    let links = Links(string)
    let shouldValidate = process.argv.indexOf('--validate')
    let shouldShowTotals = process.argv.indexOf('--stats')
    if (shouldValidate > -1) {
        let results = await validateLinks(links) //devuelve una promesa
        console.log(results)
        if (shouldShowTotals > -1) {

        }
    }
}

main();
module.exports = {
    getoString,
    Links,
    validateLinks
}