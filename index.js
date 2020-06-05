
let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
let index = process.argv.indexOf('--file');
let file = process.argv[index + 1];
let options = process.argv[index + 2];
let colors = require('colors');




const findFile = () => {

    let content = fs.readFileSync(file, 'utf-8');
    getLinks(content);
    return file
}

const validateMd = () => {
    let findMd = path.extname(file);
    if (findMd === '.md') {
        console.log('´This is a .md file: ', file);
        return true
    }
    else {
        console.log('This is not a .md file: ', file);
        return false
    }
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
                if (res.status === 200) {
                    console.log(colors.green(res.url + (colors.bold.green('  Valid link'))));
                }
                else if (res.status !== 200) {
                    console.log(colors.brightRed(res.url + (colors.bold.brightRed('  Broken link'))));
                    //console.log(link, "Broken link: ".red, status)
                }
                readLinks.push(({ url: res.url, status: res.status }));
            })
            .catch(err => {
                console.log(colors.grey(link + (colors.bold.grey('  Error'))));   //se retorna?
                readLinks.push(({ url: err.url, status: err.status }));
                //console.log(`This is not a valid link: ${link}`.red);
            })
    })
    return Promise.all(allLinks)
        .then(newres => {
            newres = readLinks;
            statsLinks(newres);
        });
}
let statsLinks = newres => {
    console.log('Total Links: ', readLinks.length);
    console.log(colors.green('Valids: ', readLinks.reduce((counter, element) => {
        if (element.status === 200) {
            return counter += 1;
        }
        return counter;
    }, 0)));
    console.log(colors.brightRed('Invalids: ', readLinks.reduce((counter, element) => {
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