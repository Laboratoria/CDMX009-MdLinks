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

let brokenLink = [];
let newArray = [];
//funciones separadas de validacion y stats

function statusLink(res, totalLinks) {
    newArray.push(res.url);
    console.log('que hace esto', newArray)
    if (totalLinks.length === newArray.length) {
        console.log(newArray)
    } else {
        console.log("no se cumple")
    }
    //console.log(newArray.length)
    /*  if (res.status !== 200) {
         brokenLink.push(res.url);
         // console.log(chalk.red(brokenLink.url + (chalk.bold.red('  x'))));
         console.log(brokenLink);
         return brokenLink;
     }
     if (res.status === 200) {
         //console.log(chalk.green(res.url + (chalk.bold.green('  ✔'))));
     }
  */
}

function validateLinks(links) {
    let total = [];
    let totalLinks = links.length; // este console log si plasma el array de links 
    links.forEach(link => {
        //console.log(links)
        return fetch(link)
            .then((res) => {
                if (res.status !== 200) {
                    total.push(res);
                    //console.log(chalk.red(res.url + (chalk.bold.red('  x'))));
                    statusLink(res, total)
                }
                if (res.status === 200) {
                    total.push(res);
                    statusLink(res, total)
                    //console.log(chalk.green(res.url + (chalk.bold.green('  ✔'))));
                    //console.log(res)
                }
            })
            .catch((e) => {
                total.push(e);
                //console.log('error------------', e)
                statusLink(e, total)
            })
    }
    )
}

module.exports = {
    validateLinks,
}