const fetch = require('node-fetch');
//const chalk = require('chalk');


let valid = []
let invalid = []
let totals = 0

function promiseResolved(res, link) {
    console.log(res)
    if (res.status === 404) {
        //console.log(link)
        //invalid.push({ status: "FetchError", link })
    } else valid.push({ status: res.status, link }) // else if < 400 || 400 invalid

    if (valid.length + invalid.length >= totals) {
        // return console.log(valid)
    }
}

function validateLinks(links) {
    totals = links.length - 1
    //console.log('hola', links) // trae el array de links totales
    links.forEach(link => fetch(link)
        .then((res) => {
            promiseResolved(res, link);
        })
        .catch(e => promiseResolved(e, link)))


}
module.exports = {
    validateLinks,
}
