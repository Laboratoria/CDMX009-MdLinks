const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
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
    let wrongLinks = 0;
    let rightLinks = 0;
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
      }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
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
  } 
};
menuOptions();

const mdLink = {
  readAndValidMarkDown, findLinks, readPathStatus
};

module.exports = {
  mdLink
};