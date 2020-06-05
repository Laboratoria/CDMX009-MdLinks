const chalk = require('chalk');

function validate(array) {
    array.map(element => {
        if (element.status >= 400 || element.status ==="Error"){
            let stringify = JSON.stringify(element.url)
            return chalk.blueBright(stringify + " Status: 404")
        } else { return chalk.yellow(element.url + " Status: 200")}
    })
}
module.exports = {
    validate
}