const fetch = require('node-fetch')
const chalk = require('chalk');



let validated = [];
function validateLinks(links) {
    let promises = links.map(link => fetch(link)
        .then(res => {
            if (res.status === 200) {
                console.log(chalk.green(res.url + (chalk.bold.green('  ✔'))));
            }
            if (res.status !== 200) {
                console.log(chalk.red(res.url + (chalk.bold.red('  x'))));
            }
            validated.push(({ url: link, status: res.status, boolean: true }))
        })
        .catch(err => {
            console.log(chalk.red(link + (chalk.bold.red('  Error x'))));
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }))

        })
    )

    return Promise.all(promises)
        .then(results => {
            console.log('total: ', validated.length);
            console.log('Malos: ', validated.reduce((accountant, element) => {
                if (element.status !== 200) {
                    return accountant += 1;
                }
                return accountant;
            }, 0))
            console.log('Buenos: ', validated.reduce((accountant, element) => {
                if (element.status === 200) {
                    return accountant += 1;
                }
                return accountant;
            }, 0))
            return results;
        })
}

module.exports = {
    validateLinks,
}

