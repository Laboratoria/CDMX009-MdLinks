const fs = require('fs')
const fetch = require('node-fetch')
const colors = require('colors')

function getContentString() {

    let index = process.argv.indexOf("--file")
    if (index < 0) return console.log("You need to use a valid uri flag --file")
    let uri = process.argv[index + 1]
    let string = fs.readFileSync(uri, 'utf8')
    return string
}

function getLinks(string) {

    const getArray = ("Text: ", string.toString());
    let regExpression = (/https?:\S+\w/gi);
    return getArray.match(regExpression);
}

function validateLinks(arrayLinks) {

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

function countAndDivideLinks(results) {

    console.log("Total links: ", colors.bgMagenta(results.length));
    console.log(colors.green("Valids: "), colors.bold.green(results.reduce((counter, response) => {
        if (response.status === 200) {
            return counter += 1;
        }
        return counter
    }, 0)));
    console.log(colors.brightRed("Dead Links: "), colors.bold.brightRed(results.reduce((counter, response) => {
        if (response.status > 200) {
            return counter += 1;
        }

        return counter
    }, 0)));
}



let main = async() => { //  (imperativo ó programacion imperativa)
    let string = getContentString()
    let links = getLinks(string)
    let shouldValidate = process.argv.indexOf('--validate')
    if (shouldValidate > -1) {
        let results = await validateLinks(links) //devuelve una promesa
        console.log(results)
        let shouldShowTotals = process.argv.indexOf('--stats')
        if (shouldShowTotals > -1) {
            let countTotals = countAndDivideLinks(results)
        }
    }
}


main()