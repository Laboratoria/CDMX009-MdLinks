const fetch = require('node-fetch');
const chalk = require('chalk')

const linksFunctions = {};

const validate = (file, path) => {
    file.map(element => {
        fetch(element.links)
            .then((res) => {
                const object = {
                    href: res.url,
                    status: res.status,
                    statusText: res.statusText,
                    text: element.text,
                    path: path
                };

                if (object.status === 200) { 
                    console.log(chalk.green(`Path: ${path}\n`)+ chalk.yellow(`${object.text}`)+chalk.green.bold(`${object.href}  ${object.status} ${object.statusText}\n   `)) }
                else { console.log(chalk.bgRed.bold(`Path: ${path}\n`)+chalk.red(`${object.text}`) +  chalk.red.bold(`${object.href}  ${object.status}  ${object.statusText} BAD\n `)) }
            })
            .catch(err => console.log(err.message))
    })
}

const stats = (links, path) => {
    let validLink = 0;
    let brokenLink = 0;
    let erros = 0
    links.map(element => {
        fetch(element.links)
            .then((res) => {
                const object = {
                    href: res.url,
                    status: res.status,
                    statusText: res.statusText
                };
                if (object.status === 200) {
                    validLink++;
                }
                if (object.status !== 200) {
                    brokenLink++;
                }
            })
            .then(() => {
                if (links.length === validLink + brokenLink) {
                    return console.log(chalk.cyan.bold(`\n${path}\n`) + chalk.magenta.bold(`Total unique Links: ${links.length}\n Right Links:${validLink}\n Wrong Links: ${brokenLink}`))
                }
            })
            .catch((err) => {
                let objetFail = err.message
                if (objetFail !== null) {
                    erros++;
                    return console.log(chalk.cyan.bold(`\n${path}\n`) + chalk.magenta.bold(`Total unique Links: ${links.length}\n   
                            Right Links :${validLink}\n 
                            Wrong Links : ${brokenLink}\n
                            Connection error : ${erros}  ${objetFail}`))
                }
            })
    })
}

const getStatusLink = (links, comandLine4, comandLine5, path) => {

    if (comandLine4 === "--stats" || comandLine5 === "--stats" || comandLine4 === "--s" || comandLine5 === "--s") {
        stats(links, path);
    }
    if (comandLine4 === "--validate" || comandLine5 === "--validate" || comandLine4 === "--v" || comandLine5 === "--v") {
        validate(links, path);
    }
    if (comandLine4 !== "--stats" && comandLine4 !== "--validate" && comandLine4 !== "--s" && comandLine4 !== "--v") {
        const mesageLine = "please type a valid option";
        console.log(chalk.cyanBright(mesageLine))
        return mesageLine
    }
    if (comandLine5 !== undefined) {
        if (comandLine5 !== "--stats" && comandLine5 !== "--validate" && comandLine5 !== "--s" && comandLine5 !== "--v") {
            const mesageLine1 = "type a valid second option";
            console.log(chalk.cyanBright(mesageLine1))
            return mesageLine1
        }
    }
}

linksFunctions.getStatusLink = getStatusLink
linksFunctions.stats = stats
linksFunctions.validate = validate

module.exports = linksFunctions
