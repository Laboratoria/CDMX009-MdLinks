const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const colors = require('colors/safe');

//make sure its a markdown file
const isMarkDown = uri => path.extname(uri) === '.md' ? true : false;

//The app must read a file
const readFile = () => {
    let index = process.argv.indexOf("--file"); //flag--> --file
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1];
    if (isMarkDown(uri)) {
        let fileInformation = fs.readFileSync(uri, 'utf8');
        showLinks(fileInformation);
    }
}

//finding links
const showLinks = (fileInformation) => {
    console.log("all the information contained in the md file", fileInformation);
    let regEx = /\bhttps:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_&#\/]+)([.a-z0-9]+)/gi;
    let result = fileInformation.match(regEx);
    checkLinkStatus(result);
}

//check link status
const checkLinkStatus = (allLinks) => {
    let promises = allLinks.map(link => fetch(link)
        .then(res => {
            let thrownAnswer = {
                url: res.url,
                status: res.status,
                text: res.statusText
            }
            if (thrownAnswer.status === 200) {
                console.log(colors.blue(res.status), colors.grey(res.statusText), ('url:', link))
            } else {
                console.log(colors.yellow(res.status), colors.green(res.statusText), ('url:', link))
            }
            return thrownAnswer
        })
        .catch(error => {
            let bug = {
                url: link,
                status: 'error',
                text: error.errno
            }
            if (bug.status === 'error') {
                console.log(colors.yellow(bug.status), colors.red(bug.text), ('url:', link))
            }
            return bug
        })
    )

    return Promise.all(promises)
        .then(res => {
            arrayCount(res)

        })

}

//Obtaining statistics
function arrayCount(res) {
    console.log(colors.underline('The total Links: '), (res.length))
    console.log(colors.magenta('Broken Links: ', res.reduce((accountant, element) => {
        if (element.status !== 200) {
            return accountant += 1
        }
        return accountant
    }, 0)))
    console.log(colors.green('Works links: ', res.reduce((accountant, element) => {
        if (element.status === 200) {
            return accountant += 1
        }
        return accountant
    }, 0)))

    return res
}

module.exports = {
    readFile,
    showLinks,
    isMarkDown,
    checkLinkStatus,
    arrayCount
}