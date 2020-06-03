const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const chalk = require('chalk');
let index = process.argv.indexOf("--file");
let uri = process.argv[index + 1];
let options = process.argv[index + 2];
let data = fs.readFileSync(uri, 'utf8')


const isMarkDown = uri => path.extname(uri) === '.md' ? true : false;

const findLinks = (data) => {
  const rExLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;
  const rExText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
  const toString = data.toString();
  const links = toString.match(rExLink);
  const text = toString.match(rExText);
  let myReturnData = [];
  for (let i = 0; i < links.length; i++) {
    let myLinkData = {
      text: text[i],
      link: links[i],
      file: uri,
    };
    myReturnData.push(myLinkData);
  } return myReturnData;
}

const readPathValidate = () => {
  if (isMarkDown(uri)) {
    let dataOfLinks = findLinks(data)
    let erros = 0;
    dataOfLinks.forEach(element => {
      fetch(element.link).then(response => {
        if (response.status == 200) {
          console.log(chalk.green(
            `File: ${uri}\nText:${element.text}\nLink: ${
            element.link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } else if (response.status == 404 || response.status == 400) {
          console.log(chalk.red(
            `File: ${uri}\nText:${element.text}\nLink: ${
            element.link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } return response;
      }).catch(function (err) {
        let objetFail = err.message
        if (objetFail !== null) {
          erros++;
          return console.log(chalk.red.bold(`Connection error : ${erros}   ${objetFail})`));
        }
      });
    })
  }
  else {
    console.log("Its not a .md file")
    return false;
  }
}

const readPathStats = () => {
  if (isMarkDown(uri)) {
    let dataOfLinks = findLinks(data)
    let wrongLinks = 0;
    let rightLinks = 0;
    let erros = 0;
    dataOfLinks.forEach(element => {
      fetch(element.link).then(response => {
        if (response.status == 200) {
          rightLinks++;
        } else if (response.status == 404 || response.status == 400) {
          wrongLinks++;
        } else {
          console.log('error', response.status);
        }
        if (wrongLinks + rightLinks === dataOfLinks.length) {
          console.log(chalk.yellow(`File: ${uri} has:`));
          console.log(chalk.yellow(`✔ Total Links: ${dataOfLinks.length}`));
          console.log(chalk.green(`✔ Total Right Links: ${rightLinks}`));
          console.log(chalk.red(`✖ Total Broken Links: ${wrongLinks}\n`));
        } return response;
      }).catch(function (err) {
        let objetFail = err.message
        if (objetFail !== null) {
          erros++;
          return console.log(chalk.red.bold(`Total Links:${dataOfLinks.length}\nRight Links :${rightLinks}\nWrong Links : ${wrongLinks}\nConnection error : ${erros}   ${objetFail})`));
        }
      });
    })
  } else {
    console.log("Its not a .md file")
    return false;
  }
}

const validateAndStats = () => {
  if (isMarkDown(uri)) {
    readPathValidate();
    readPathStats();
  } else {
    console.log('Its not a .md file')
  }
}

const menuOptions = () => {
  if (options === '--validate') {
    readPathValidate();
  } else if (options === '--stats') {
    readPathStats();
  } else if (options === '--validate--stats') {
    validateAndStats();
  }
};
menuOptions();

const mdLink = {
  isMarkDown, findLinks, readPathValidate, readPathStats, validateAndStats
};

module.exports = {
  mdLink
};