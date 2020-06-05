const chalk = require('chalk');

function validate(array) {
    array.map(element => {
        if (element.status >= 400 || element.status ==="Error"){
            let stringify = JSON.stringify(element.url)
            console.log(chalk.blueBright(stringify + " Status: 404"))
        } else console.log(chalk.yellow(element.url + " Status: 200"))
    })
}
module.exports = {
    validate
}