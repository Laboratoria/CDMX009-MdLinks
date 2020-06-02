const fetch = require('node-fetch')
const chalk = require('chalk');


function statusLink(res, link) {
    if (res.status === 404) {
        let brokenLink = (res.status, link); //como hago push al  array?
        console.log(chalk.red(brokenLink + (chalk.bold.red('  x'))));
        // console.log(typeof brokenLinks) //por que el tipo no es array y es string?
        //return brokenLinks //se retorna?
    } else {
        let usefulLink = (res.status, link);
        console.log(chalk.green(usefulLink + (chalk.bold.green('  ✔'))));
    }
}

function validateLinks(links) {
    totals = links.length - 1;
    //console.log(links); // este console log si plasma el array de links 
    links.forEach(link => {
        //console.log(links)
        fetch(link)
            .then((res) => {
                statusLink(res, link)
                //console.log(res.status, res.url)
            })
            .catch((e) => {
                console.log('error------------', e)
                statusLink(e, link)
            })
    }
    )
}

module.exports = {
    validateLinks,
}


/*
const fetch = require('node-fetch')
const chalk = require('chalk');


function statusLink(res, link) {
    if (res.status === 404) {
        let brokenLink = (res.status, link); //como hago push al  array?
        console.log(chalk.red(brokenLink + (chalk.bold.red('  x'))));
        // console.log(typeof brokenLinks) //por que el tipo no es array y es string?
        //return brokenLinks //se retorna?
    } else {
        let usefulLink = (res.status, link);
        console.log(chalk.green(usefulLink + (chalk.bold.green('  ✔'))));
    }
}

function validateLinks(links) {
    totals = links.length - 1;
    //console.log(links); // este console log si plasma el array de links
    links.forEach(link => {
        //console.log(links)
        fetch(link)
            .then((res) => {
                statusLink(res, link)
                //console.log(res.status, res.url)
            })
            .catch((e) => {
                console.log('error------------', e)
                statusLink(e, link)
            })
    }
    )
}

module.exports = {
    validateLinks,
}
 */