const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
const chalk = require('chalk');
let index = process.argv.indexOf("--file");
let uri = process.argv[index + 1];
let options = process.argv[index + 2];
let data = fs.readFileSync(uri, 'utf8')

const readAndValidMarkDown = (uri) => {
  const fileExtencion = path.extname(uri);
  if (fileExtencion != '.md') {
    return false;
  } else {
    return true;
  }
}
const findLinks = (data) => {
  const rExLink = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+)(?=\))/g;   // solo links (https y www)
  // const rExLink = /((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+/g; // todos los tipos de links
  const rExText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
  const toString = data.toString();
  const links = toString.match(rExLink);
  const text = toString.match(rExText);
  var myReturnData = [];
  for (let i = 0; i < links.length; i++) {
    var myLinkData = {
      text: text[i],
      link: links[i],
      file: uri,
    };
    myReturnData.push(myLinkData);
    // console.log(myLinkData)
    // console.log(i)

  }
  return myReturnData;
}
// //function  fetch response status
const readPathStatus = () => {
  if (readAndValidMarkDown(uri) === true) {
    let myProcData = findLinks(data)    
    let erros = 0;
    for (let i = 0; i < myProcData.length; i++) {
      fetch(myProcData[i].link).then(response => {
        if (response.status == 200) {
          console.log(chalk.green(
            `File: ${uri}\nText:${myProcData[i].text}\nLink: ${
            myProcData[i].link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } else if (response.status == 404 || response.status == 400) {
          console.log(chalk.red(
            `File: ${uri}\nText:${myProcData[i].text}\nLink: ${
            myProcData[i].link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } else {
          console.log('error', response.status);
        }
      }).catch(function (err) {
        let objetFail = err.message
        if (objetFail !== null) {
          erros++;
          return console.log(chalk.red.bold(`Connection error : ${erros}   ${objetFail})`));
        }
      });
    }
  } else {
    console.log("Its not a .md file")
    return false;
  }
}
const functionStats = () => {
  if (readAndValidMarkDown(uri) === true) {
    let myProcData = findLinks(data)
    let wrongLinks = 0;
    let rightLinks = 0;
    let erros = 0;
    for (let i = 0; i < myProcData.length; i++) {
      fetch(myProcData[i].link).then(response => {
        if (response.status == 200) {
          rightLinks++;
        } else if (response.status == 404 || response.status == 400) {
          wrongLinks++;
        } else {
          console.log('error', response.status);
        }
        if (wrongLinks + rightLinks === myProcData.length) {
          console.log(chalk.yellow(`File: ${uri} has:`));
          console.log(chalk.yellow(`✔ Total Links: ${myProcData.length}`));
          console.log(chalk.green(`✔ Total Right Links: ${rightLinks}`));
          console.log(chalk.red(`✖ Total Broken Links: ${wrongLinks}\n`));
        }
      }).catch(function (err) {
        let objetFail = err.message
        if (objetFail !== null) {
          erros++;
          return console.log(chalk.red.bold(`Total Links:${myProcData.length}\nRight Links :${rightLinks}\nWrong Links : ${wrongLinks}\nConnection error : ${erros}   ${objetFail})`));
        }
      });
    }
  } else {
    console.log("Its not a .md file")
    return false;
  }
}
const validateAndStats = () => {
  if (readAndValidMarkDown(uri) === true) {
    let myProcData = findLinks(data)
    let wrongLinks = 0;
    let rightLinks = 0;
    let erros = 0;
    for (let i = 0; i < myProcData.length; i++) {
      fetch(myProcData[i].link).then(response => {

        if (response.status == 200) {
          rightLinks++;
          console.log(chalk.green(
            `File: ${uri}\nText:${myProcData[i].text}\nLink: ${
            myProcData[i].link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } else if (response.status == 404 || response.status == 400) {
          wrongLinks++;
          console.log(chalk.red(
            `File: ${uri}\nText:${myProcData[i].text}\nLink: ${
            myProcData[i].link
            }\nResponse code: ${response.status}\nResponse: ${response.statusText}\n`),
          );
        } else {
          console.log('error', response.status);
        }
        if (wrongLinks + rightLinks === myProcData.length) {
          console.log(chalk.yellow(`File: ${uri} has:`));
          console.log(chalk.yellow(`✔ Total Links: ${myProcData.length}`));
          console.log(chalk.green(`✔ Total Right Links: ${rightLinks}`));
          console.log(chalk.red(`✖ Total Broken Links: ${wrongLinks}\n`));
        }
      }).catch(function (err) {
        let objetFail = err.message
        if (objetFail !== null) {
          erros++;
          return console.log(chalk.red.bold(`Total Links:${myProcData.length}\nRight Links :${rightLinks}\nWrong Links : ${wrongLinks}\nConnection error : ${erros} ${objetFail})`));
        }
      });
    }
  } else {
    console.log("Its not a .md file")
    return false;
  }
}

const menuOptions = () => {
  if (options === '--validate') {
    // console.log('Validated Links:')
    readPathStatus();
  } else if (options === '--stats') {
    // console.log('Links Status:')
    functionStats();
  } else if (options === '--validate--stats') {
    // console.log('Validate Linsks and Status:')
    validateAndStats();
  }
};
menuOptions();

const mdLink = {
  readAndValidMarkDown, findLinks, readPathStatus, functionStats, validateAndStats
};

module.exports = {
  mdLink
};