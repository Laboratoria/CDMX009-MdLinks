const fetch = require('node-fetch')
const chalk = require('chalk');

let validated = [];
function validateLinks(links) {
    let promises = links.map(link => fetch(link)
        .then(res => {
            if (res.status === 200) {
                let link202 = chalk.green(res.url + (chalk.bold.green('  ✔')))
                console.log(link202);
            }
            if (res.status !== 200) {
                let linkOthers = chalk.red(res.url + (chalk.bold.red('  x')));
                console.log(linkOthers);
            }
            validated.push(({ url: link, status: res.status, boolean: true }))
        })
        .catch(err => {
            let linkError = chalk.red(link + (chalk.bold.red('  Error x')))
            console.log(linkError);   //se retorna?
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }))
        })
    )
    return Promise.all(promises)
        .then(results => {
            results = validated;
            stastLinks(results);
        })
}

function stastLinks(results) {
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

module.exports = {
    validateLinks,
    stastLinks
}

