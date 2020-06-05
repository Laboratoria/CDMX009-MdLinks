#!/usr/bin/env node

const fetch = require('node-fetch');
const chalk = require('chalk');
const argv = require('./yargs').argv;

let validated = [];
function validateLinks(links) {
    console.log(chalk.cyanBright.bold('hola mundo si estas en la funcion ValidateLinks')); // con este se que ya esta accediendo a la funcion OPTIONMENU
    let promises = links.map(link => fetch(link)
        .then(res => {
            if (res.status === 200) {
                let link202 = chalk.green(res.url + (chalk.bold.green('  ✔')));
                //console.log(link202);
            }
            if (res.status !== 200) {
                let linkOthers = chalk.red(res.url + (chalk.bold.red('  x')));
                //console.log(linkOthers);
            }
            validated.push(({ url: link, status: res.status, boolean: true }));
        })
        .catch(err => {
            let linkError = chalk.red(link + (chalk.bold.red('  Error x')));
            //console.log(linkError);   //se retorna?
            validated.push(({ url: link, status: 'Error', text: err.status, boolean: false }));
        })
    )
    return Promise.all(promises)
        .then(results => {
            results = validated;
            stastLinks(results);
            optionMenu(results);
        })
}

function stastLinks(results) {
    console.log(chalk.bold.underline('  Total: ', validated.length, " ")); // con este se que ya esta accediendo a la funcion OPTIONMENU
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
    //console.log(validated)
    optionMenu(results)
    return results
}

function optionMenu(links) {
    const command = argv._[0]
    switch (command) {
        case 'validate':
            console.log(argv.path, "Estas validando links morra")
            validateLinks(argv.path, links)
                .then(link => {
                    console.log('hola mundo')
                    console.log('hola', link)
                })
                .catch(e => {
                    console.log(e.brightRed)
                })
            //console.log('hola', validateLinks(linksVal))
            break;
        case 'stats':
            console.log(argv.path, "vas a crear estadisticas morra")
            stastLinks(command)
                .then(message => {
                    console.log(message)
                })
                .catch(e => {
                    console.log(e.brightRed)
                })
            break;
        default:
            console.log("Ejecuta el comando --help para obtener mas información sobre lo que puedes hacer")
    };
}
optionMenu()

module.exports = {
    validateLinks,
    stastLinks
}

