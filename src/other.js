//LECTURA DE ARCHIVO DE FORMA SINCRONA
/* function readFile(currentFile) {
    let index = process.argv.findIndex(element => element == '--file');
    let uri = process.argv[index + 1];
    if (index < 0) return console.log('Ingresa una URI válida');
    currentFile = fs.readFileSync(uri, 'utf-8');
    console.log(currentFile);
    return currentFile;
}
readFile(); */

//funcion asyncrona sin asyn y await
/* function readFilesAsync(currentFile) {
    let index = process.argv.findIndex(element => element == '--file');
    let uri = process.argv[index + 1];

    currentFile = fs.readFile(uri, 'utf-8', (err, data) => {
        if (index < 0) {
            return console.log('no es una uri valida');
        } else {
            return console.log(data);
        }
    })
    return currentFile;
}
readFilesAsync();

module.exports = readFilesAsync;
 */

function getLinks(links) {
    let str = 'Prueba de un nuevo regExppara identificar un link con https con ejemplos https://nodejs.org/api/https.html#https_https_get_ y con algunos espacios entre ellos para ver como funciona con links separados https://github.com/BrendaCarranco/CDMX009-MdLinks/blob/master/app.js';
    let regExp = /\bhttps?:\/\/\S+/gi;
    links = [];

    while ((links = regExp.exec(str)) !== null) {
        console.log('link: ' + links);
    }
    return links;
}
getLinks();



/* const fetch = require('node-fetch')

let totals = 0

let valid = []
let invalid = []

function promiseResolved(res, link, isError) {
    if (isError) {
        invalid.push({ status: "FetchError", link })
    } else valid.push({ status: res.status, link }) // else if < 400 || 400 invalid

    if (valid.length + invalid.length >= totals) {
        return console.log(valid)
    }
}



function validateLinks(link) {
    totals = link.length - 1
    link.forEach(link => fetch(link)
        .then(res => promiseResolved(res, link, false))
        .catch(e => promiseResolved(e, link, true)));
}

module.exports = {
    validateLinks,
}
let indexValidate = process.argv.indexOf('--validation');
let indexStatus = process.argv.indexOf('--stat');
let links = 0;//que links validare;
let status =0; // totales
if(indexValidate > 0){
    validateLinks(links, true);
} else {
    validateLinks(links, false);
} */





function promiseResolved(res, link) {
    if (res.status === 404) {
        let st404 = link; //como hago push al  array?
        console(st404)
        //console.log(chalk.red(st404 + (chalk.bold.red('  x'))));
        // console.log(typeof brokenLinks) //por que el tipo no es array y es string?
        //return brokenLinks //se retorna?
    } else {
        let st202 = link;
        //console.log(chalk.green(st202 + (chalk.bold.green('  ✔'))));
    }
    //console.log(typeof brokenLinks);// por que en esta linea no arroja el array de los enlaces rotos?
    //por que no me regresa brokenLInks en un array en ningun momento?
    //por que no arroja como array sino como objeto?
    //totalLinks(brokenLinks, usefulLinks)


}


// validacion y stas de bliss edith
/* let validated = [];
function validateLinks(links) {
    let promises = links.map(link => fetch(link)
        .then(res => {
            validated.push(({ url: link, status: res.status, boolean: true }))
        })
        .catch(err => validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }))))

    return Promise.all(promises)
        .then(results => {
            console.log('total: ', validated.length);
            console.log('Malos: ', validated.reduce((acc, el) => {
                if (el.status === 404 || el.status === 'Error') return acc += 1;
                return acc;
            }, 0))
            console.log('Buenos: ', validated.reduce((acc, el) => {
                if (el.status !== 404)
                    return acc += 1;
                return acc;

            }, 0))
            return results;
        })
} */
