const fetch = require('node-fetch')
const chalk = require('chalk');

// funcion validacion y stats
function validateLinks(links, brokenLink, usefulLink) {
    brokenLink = [];
    usefulLink = [];
    totals = links.length - 1;
    //console.log(links); // este console log si plasma el array de links 
    links.forEach(link => {
        //console.log(links)
        fetch(link)
            .then((res) => {
                if (res.status === 404) {
                    let links404 = (res.status, link);
                    //console.log(chalk.red(links404 + (chalk.bold.red('  x'))));
                    console.log('strings 404: ', links404)
                    brokenLink.push(links404);
                    console.log(brokenLink)
                    //return brokenLinks
                } else {
                    let linksOk = (res.status, link);
                    //console.log(chalk.green(linksOk + (chalk.bold.green('  ✔'))));
                    usefulLink.push(linksOk);
                }
            })
            .catch((e) => {
                let errorFetch = e;
                //console.log(chalk.red(errorFetch + (chalk.bold.red('  x'))));
                //brokenLinks.push(errorFetch)
                //console.log(brokenLinks.length)
            })
    }
    )
    console.log('broken  x  ', brokenLink);
    console.log('useful    ok', usefulLink.length)
}


//funciones separadas de validacion y stats
function statusLink(res, link) {
    if (res.status !== 200) {
        let brokenLink = (res); //como hago push al  array?
        console.log(chalk.red(brokenLink.url + (chalk.bold.red('  x'))));
        // console.log(typeof brokenLinks) //por que el tipo no es array y es string?
        //return brokenLinks //se retorna?
    }
    if (res.status === 200) {
        console.log(chalk.green(res.url + (chalk.bold.green('  ✔'))));
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
                //console.log(res)
            })
            .catch((e) => {
                //console.log('error------------', e)
                statusLink(e, link)
            })
    }
    )
}

module.exports = {
    validateLinks,
}