const fetch = require('node-fetch');
const chalk = require('chalk');

let validated = [];
function validateLinks(links) { //funcion original que hace todo validacion
    let promises = links.map(link => fetch(link)
        .then(res => {
            if (res.status === 200) {
                let link202 = chalk.green(res.url + (chalk.bold.green('  ✔')));
                console.log(link202);
            }
            if (res.status !== 200) {
                let linkOthers = chalk.red(res.url + (chalk.bold.red('  x')));
                console.log(linkOthers);
            }
            validated.push(({ url: link, status: res.status, boolean: true }));
        })
        .catch(err => {
            let linkError = chalk.red(link + (chalk.bold.red('  Error x')));
            console.log(linkError);   //se retorna?
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }));
        })
    )
    return Promise.all(promises)
        .then(results => {
            results = validated;
            statsLinks(results);
        })
}

function statsLinks(results) { //funcion original que hace todo statsa
    console.log(chalk.bold.underline('  Total Links   ', validated.length, " "));
    console.log(chalk.red.bold('  Broken Links: ', results.reduce((accountant, element) => {
        if (element.status !== 200) {
            return accountant += 1;
        }
        return accountant;
    }, 0)), '  ')
    console.log(chalk.greenBright.bold('  Useful Links: ', results.reduce((accountant, element) => {
        if (element.status === 200) {
            return accountant += 1;
        }
        return accountant;
    }, 0)), '  ')
    return results
}


function showLinksValidated(links) {
    links.map(link => fetch(link)
        .then(res => {
            if (res.status === 200) {
                let link202 = chalk.green(res.url + (chalk.bold.green('  ✔')));
                console.log(link202);
            }
            if (res.status !== 200) {
                let linkOthers = chalk.red(res.url + (chalk.bold.red('  x')));
                console.log(linkOthers);
            }
            validated.push(({ url: link, status: res.status, boolean: true }));
        })
        .catch(err => {
            let linkError = chalk.red(link + (chalk.bold.red('  Error x')));
            console.log(linkError);   //se retorna?
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }));
        })
    )

}


function showLinksStats(links) {
    let promises = links.map(link => fetch(link)
        .then(res => {
            validated.push(({ url: link, status: res.status, boolean: true }));
        })
        .catch(err => {
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }));
        })
    )
    return Promise.all(promises)
        .then(results => {
            results = validated;
            statsLinks(results);
        })
}



module.exports = {
    validateLinks,
    statsLinks,
    showLinksValidated,
    showLinksStats,
}

