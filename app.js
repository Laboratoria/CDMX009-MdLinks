let fs = require('fs');
const fetch = require('node-fetch');
let colors = require('colors');

const findFile = () => {
    let index = process.argv.indexOf('--file');
    let file = process.argv[index + 1];
    readFile(file)
    readFileValidation(file)
    readFilesStats(file)
    return file
}
const readFile = (newFile) => {
    let content = fs.readFileSync(newFile, 'utf-8');
    getLinks(content);
}

const getLinks = (string) => {
    let regEx = (/https?:\S+\w/gi);
    let links = string.match(regEx);
    validateLinks(links)
}

function readFileValidation(newFile) { //validar lectura
    let string = fs.readFileSync(newFile, 'utf8')
    getLinksValidation(string)
    return string;
}

function getLinksValidation(string) { //validar obtener links
    let regEx = (/https?:\S+\w/gi);
    let links = string.match(regEx);
    showLinksValidated(links)
}
function readFilesStats(newFile) { //stats lectura
    let string = fs.readFileSync(newFile, 'utf8')
    getLinkStats(string)
    return string;
}

function getLinkStats(string) { //stats obtener
    let regEx = (/https?:\S+\w/gi);
    let links = string.match(regEx);
    showLinksStats(links)
}

let validateLinks = links => {
    let allLinks = links.map(link => {
        return fetch(link)
            .then(res => {
                let object = {
                    url: res.url,
                    status: res.status,
                    statusText: res.statusText
                };
                if (object.status === 200) {
                    console.log(colors.gray(link, '') + colors.green(`${object.statusText} `) + colors.bold.green(`${object.status}`))
                }
                else if (object.status !== 200) {
                    console.log(colors.gray(link, '') + colors.brightRed(`${object.statusText} `) + colors.bold.brightRed(`${object.status}`))
                }
                return object
            })
            .catch(err => {
                console.log(colors.grey(link + (colors.bold.yellow(' Error'))));
                return { url: err.url, status: err.status }
            })
    })
    return Promise.all(allLinks)
        .then(newres => {
            statsLinks(newres);

            return newres
        })
};

let statsLinks = results => {
    console.log('Total Links: ', colors.cyan(results.length));
    console.log(colors.green('Valids: '), colors.bold.green(results.reduce((counter, element) => {
        if (element.status === 200) {
            return counter += 1;
        }
        return counter;
    }, 0)));
    console.log(colors.brightRed('Invalids: '), colors.bold.brightRed(results.reduce((counter, element) => {
        if (element.status !== 200) {
            return counter += 1;
        }
        return counter;
    }, 0)))
    return results;
}
let showLinksValidated = links => {
    links.map(link => {
        return fetch(link)
            .then(res => {
                let object = {
                    url: res.url,
                    status: res.status,
                    statusText: res.statusText
                };
                if (object.status === 200) {
                    console.log(colors.gray(link, '') + colors.green(`${object.statusText} `) + colors.bold.green(`${object.status}`))
                }
                else if (object.status !== 200) {
                    console.log(colors.gray(link, '') + colors.brightRed(`${object.statusText} `) + colors.bold.brightRed(`${object.status}`))
                }
                return object
            })
            .catch(err => {
                console.log(colors.grey(link + (colors.bold.yellow(' Error'))));
                return { url: err.url, status: err.status }
            })
    })
};
let showLinksStats = links => {
    let allLinks = links.map(link => fetch(link)
        .then(res => {
            return { url: link, status: res.status, boolean: true };

        })
        .catch(err => {
            return { url: link, status: 'Error', text: err.status, boolean: false };
        })
    )
    return Promise.all(allLinks)
        .then(results => {
            statsLinks(results);
        })
}


module.exports = {
    readFile,
    readFileValidation,
    readFilesStats,

}