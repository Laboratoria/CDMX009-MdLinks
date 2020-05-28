const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
let index = process.argv.indexOf("--file");
let uri = process.argv[index + 1];
let options = process.argv[index + 2];
let data = fs.readFileSync(uri, 'utf8')
const chalk = require("chalk");

//Se verifica que el archivo sea .md
const readMd = (uri) => {
  const fileExtencion = path.extname(uri);
  if (fileExtencion != '.md') {
    console.log (chalk.redBright('Introduce un archivo .md válido'));
    return false;
  } else {
    console.log('Yay! Si es un archivo .md');
    return true;
  }
}
//Para obtener los links
const links = (data) => {
  const rExLink = /((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+/g; // todos los tipos de links
  const rExText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; //el texto
  const toString = data.toString();
  const links = toString.match(rExLink);
  const text = toString.match(rExText);
  var returnData = [];
  for (let i = 0; i < links.length; i++) {
    var newLinkData = {
      text: text[i],
      link: links[i],
      file: uri,
    };
    returnData.push(newLinkData);
  }
  return returnData;
}
//Función para leer el status de los links
const readStats = ()  => {
  if (readMd(uri) === true) {
    myProcData = links(data)
    let badLinks = 0;
    let goodLinks = 0;
    for (let i = 0; i < myProcData.length; i++) {
      fetch(myProcData[i].link).then(response => {
        if (response.status == 200) {
          goodLinks++;
          console.log(
            `File: ${uri}\n Text: ${myProcData[i].text}\n Link: ${
            myProcData[i].link
            }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
          );
        } else if (response.status == 404 || response.status == 400) {
          badLinks++;
          console.log(chalk.redBright(
            `File: ${uri}\n Text:${myProcData[i].text}\n Link: ${
            myProcData[i].link
            }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`,
          ));
        } else {
          console.log('error', response.status);
        }
      });
    };
  };
};
// función para validar
const validateLinks = ()  => {
  myProcData = links(data)
  let badLinks = 0;
  let goodLinks = 0;
  for (let i = 0; i < myProcData.length; i++) {
    fetch(myProcData[i].link).then(response => {
      if (response.status == 200) {
        goodLinks++;
      } else if (response.status == 404 || response.status == 400) {
        badLinks++;
      } else {
        console.log('error', response.status);
      }
      //se muestran los resultados de los links
      if (badLinks + goodLinks === myProcData.length) {
        console.log(chalk.cyan(`File: ${uri} has:`));
        console.log(chalk.magenta(`✔ Total Links: ${myProcData.length}`));
        console.log(chalk.greenBright(`✔ Total Unique Links: ${goodLinks}`));
        console.log(chalk.redBright(`✖ Total Broken links: ${badLinks}\n`));
      }
    });
  }
}
//función stat y validate
const validateAndStats = () => {
  if (readMd(uri) === true) {
    myProcData = links(data)
    let badLinks = 0;
    let goodLinks = 0;
    for (let i = 0; i < myProcData.length; i++) {
      fetch(myProcData[i].link).then(response => {
        if (response.status == 200) {
          goodLinks++;
          console.log(
            `File: ${uri}\n Text:${myProcData[i].text}\n Link: ${
            myProcData[i].link
            }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
          );
        } else if (response.status == 404 || response.status == 400) {
          badLinks++;
          console.log(chalk.redBright(
            `File: ${uri}\n Text:${myProcData[i].text}\n Link: ${
            myProcData[i].link
            }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`,
          ));
        } else {
          console.log('error', response.status);
        }
        //se muestran los resultados de los links
        if (badLinks + goodLinks === myProcData.length) {
          console.log(chalk.cyan(`File: ${uri} has:`));
          console.log(chalk.magenta(`✔ Total Links: ${myProcData.length}`));
          console.log(chalk.greenBright(`✔ Total Unique Links: ${goodLinks}`));
          console.log(chalk.redBright(`✖ Total Broken links: ${badLinks}\n`));
        }
      });
    }
  }
}
// opciones en la terminal
const menuOptions = () => {
  if (options === '--validate') {
   console.log('Links Validate') 
   validateLinks();
  } else if (options === '--stats') {
    console.log(readStats(uri));
  } else if (options === '--validate--stats') {
    console.log(validateAndStats(uri));
  }
};
menuOptions();

const mdLink = {
  readMd, links, validateAndStats, menuOptions, readStats, validateLinks
};

module.exports = {
  mdLink
};