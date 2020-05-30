const fetch = require('node-fetch');
const chalk = require('chalk')

const linksFunctions = {};

const getStatusLink = (links, comandLine4, comandLine5) => {

    if (comandLine4 === "--stats" || comandLine5 === "--stats" || comandLine4 === "--s" || comandLine5 === "--s") {
        stats(links);
    }
    if (comandLine4 === "--validate" || comandLine5 === "--validate" || comandLine4 === "--v" || comandLine5 === "--v") {
        validate(links);
    }
    if (comandLine4 !== "--stats" && comandLine4 !== "--validate" && comandLine4 !== "--s" && comandLine4 !== "--v") {
        let mesageLine = "please type a valid option";
        console.log(chalk.cyanBright(mesageLine))
        return mesageLine
    }
    if (comandLine5 !== undefined) {
        if (comandLine5 !== "--stats" && comandLine5 !== "--validate" && comandLine5 !== "--s" && comandLine5 !== "--v") {
            let mesageLine1 = "type a valid second option";
            console.log(chalk.cyanBright(mesageLine1))
            return mesageLine1
        }
    }
}

const validate = (file) => {
    file.map(element => {
        fetch(element.links)
            .then((res) => {
                let object = {
                    href: res.url,
                    status: res.status,
                    statusText: res.statusText,
                    text: element.text
                };

                if (object.status === 200) { console.log(chalk.green(`${object.href} ${object.text} ${object.status} ${object.statusText}   `)) }
                //{console.log(object)}
                else { console.log(chalk.red(`${object.href}  ${object.status}  ${object.statusText} BAD `)) }
            })
            .catch(err => console.log(err.message))
    })
}

const stats = (links) => {
    let validLink = 0;
    let brokenLink = 0;
    let erros = 0
    links.map(element => {
        fetch(element.links)
            .then((res) => {
                let object = {
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
                    return console.log(chalk.magenta.bold(`Links totales: ${links.length}\n Links corectos:${validLink}\n Links erróneos: ${brokenLink}`))
                }
            })
            .catch((err) => {
                let objetFail = err.message
                if (objetFail !== null) {
                    erros++;
                    return console.log(chalk.magenta.bold(`Total Links: ${links.length}\n   
                            Right Links :${validLink}\n 
                            Wrong Links : ${brokenLink}\n
                            Connection error : ${erros}  ${objetFail}`))
                }
            })
    })
}

linksFunctions.getStatusLink = getStatusLink
linksFunctions.stats = stats
linksFunctions.validate = validate

module.exports = linksFunctions
