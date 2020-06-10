const path = require('path');
const fs = require('fs');

// make sure it's a markdown file
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

//Finding links
const showLinks = (fileInformation) => {
    let regEx = /\bhttps:\/\/([a-z0-9.a-z0-9\/]+)([-a-z0-9?=_&#\/]+)([.a-z0-9]+)/gi;
    let result = fileInformation.match(regEx);
    console.log("All links", result);
}
module.exports = {
    readFile,
}