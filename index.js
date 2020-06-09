const fetch = require('node-fetch');
const chalk = require('chalk');


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

function statsLinks(results) {
    console.log(chalk.bold.underline('  Total: ', validated.length, " "));
    console.log(chalk.red.bold('  Malos: ', results.reduce((accountant, element) => {
        if (element.status !== 200) {
            return accountant += 1;
        }
        return accountant;
    }, 0)), '  ')
    console.log(chalk.cyan.bold('  Buenos:', results.reduce((accountant, element) => {
        if (element.status === 200) {
            return accountant += 1;
        }
        return accountant;
    }, 0)), '  ')
    return results
}


function lachoncha(links) {
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

}


function onlyStats(links) {
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
    lachoncha,
    onlyStats
}