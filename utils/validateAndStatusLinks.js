const fetch = require('node-fetch');
const chalk = require('chalk')

const linksFunctions={};
const getStatusLink=(links)=> {
    if (process.argv[4] === "--stats" || process.argv[5] === "--stats") {
        stats(links);
    }
     if (process.argv[4] === "--validate" || process.argv[5] === "--validate") {
       validate(links);
    }
    else console.log(chalk.cyanBright("please type a valid option"))
}

const validate = (links) =>{
links.map(element => {
fetch(element.link)
.then((res) => {
let object = {
    href: res.url,
    status: res.status,
    statusText: res.statusText
};
if (object.status === 200) { console.log(chalk.green(`${object.href}  ${object.status} ${object.statusText}  `)) }
else  { console.log(chalk.red(`${object.href}  ${object.status}  ${object.statusText} BAD `)) }
})
.catch(err => console.log(err.message))
})
}

const stats=(links)=>{
let validLink = 0;
let brokenLink = 0;
let erros = 0
links.map(element => {
fetch(element.link)
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
                    return console.log(chalk.magenta.bold(`Links totales: ${totalLinks = links.length}\n Links corectos:${validLink}\n Links erróneos: ${brokenLink}`))
                }
            })
            .catch((err) => {
                let objetFail = err.message
                if (objetFail !== null) {
                    erros++;
                    return console.log(chalk.magenta.bold(`Total Links: ${totalLinks = links.length}\n   
                            Right Links :${validLink}\n 
                            Wrong Links : ${brokenLink}\n
                            Connection error : ${erros}   ${objetFail}`))
                }
            })
        })
}

linksFunctions.getStatusLink=getStatusLink
linksFunctions.stats=stats
linksFunctions.validate=validate

module.exports =linksFunctions
