
let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
let colors = require('colors');


const findFile = () => {
    let index = process.argv.indexOf('--file');
    let file = process.argv[index + 1];
    readFile(file)
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
    return links
}

let readLinks = [];
let validateLinks = links => {
    let allLinks = links.map(link => {
        return fetch(link)
            .then(res => {
                let object = {
                    url: res.url,
                    status: res.status,
                    statusText: res.statusText
                };
                if (res.status === 200) {
                    console.log(colors.gray(link, '') + colors.green(`${object.statusText} `) + colors.bold.green(`${object.status}`))

                }
                else if (res.status !== 200) {
                    console.log(colors.gray(link, '') + colors.brightRed(`${object.statusText} `) + colors.bold.brightRed(`${object.status}`))
                }
                readLinks.push(({ url: res.url, status: res.status, statusText: res.statusText }));
            })
            .catch(err => {
                console.log(colors.grey(link + (colors.bold.yellow(' Error'))));   //se retorna?
                readLinks.push(({ url: err.url, status: err.status }));
            })
    })
    return Promise.all(allLinks)
        .then(newres => {
            newres = readLinks;
            statsLinks(newres);
        });
}
let statsLinks = newres => {
    console.log('Total Links: ', colors.cyan(readLinks.length));
    console.log(colors.green('Valids: '), colors.bold.green(readLinks.reduce((counter, element) => {
        if (element.status === 200) {
            return counter += 1;
        }
        return counter;
    }, 0)));
    console.log(colors.brightRed('Invalids: '), colors.bold.brightRed(readLinks.reduce((counter, element) => {
        if (element.status !== 200) {
            return counter += 1;
        }
        return counter;
    }, 0)))
    return newres;
}



findFile();

module.exports = {
    validateLinks, statsLinks
}