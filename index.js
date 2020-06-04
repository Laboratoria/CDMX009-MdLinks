const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
let index = process.argv.indexOf("--file");
let uri = process.argv[index + 1];
let options = process.argv[index + 2];
let data = fs.readFileSync(uri, 'utf8')
const colors = require("colors");

//Se verifica que el archivo sea .md
const validateUri = (uri) => {
  const fileExtencion = path.extname(uri);
  if (fileExtencion != '.md') {
    console.log ('Introduce un archivo .md válido'.red);
    return false;
  } else {
    console.log('Yay! Si es un archivo .md'.rainbow);
    return true;
  }
}
//Para obtener los links
const getLinks = (data) => {
  const rExLink = /((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n)]+/g; // todos los tipos de links
  const rExText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g; //el texto
  const toString = data.toString();
  const links = toString.match(rExLink);
  const text = toString.match(rExText);
  let newData = [];
  for (let i = 0; i < links.length; i++) {
    let collectionData = {
      text: text[i],
      link: links[i],
      file: uri,
    };
    newData.push(collectionData);
  }
  return newData;
}
//Función para leer el status de los links
const showStats = () => {
  if (validateUri(uri) === true) {
    dataLinks = getLinks(data)
    let badLinks = 0;
    let goodLinks = 0;
    for (let i = 0; i < dataLinks.length; i++) {
      fetch(dataLinks[i].link).then(response  => {
        //await
        if (response.status == 200) {
          goodLinks++;
          console.log(
            `File: ${uri}\n Text: ${dataLinks[i].text}\n Link: ${
              dataLinks[i].link
            }\n  Response code: ${response.status}\nResponse: ${response.statusText}\n`,
          );
        //await
        } else if (response.status == 404 || response.status == 400) {
          badLinks++;
          console.log(
            `File: ${uri}\n Text:${dataLinks[i].text}\n Link: ${
              dataLinks[i].link
            }\n Response code: ${response.status}\nResponse: ${response.statusText}\n`.brightRed,
          );
        //await 
        } else {
          console.log('error', response.status);
        }
      });
    };
  };
};
// función para validar
const validateLinks = ()  => {
  dataLinks = getLinks(data)
  let badLinks = 0;
  let goodLinks = 0;
  for (let i = 0; i < dataLinks.length; i++) {
    fetch(dataLinks[i].link).then(response => {
      if (response.status == 200) {
        goodLinks++;
      } else if (response.status == 404 || response.status == 400) {
        badLinks++;
      } else {
        console.log('error', response.status);
      }
      //se muestran los resultados de los links
      if (badLinks + goodLinks === dataLinks.length) {
        console.log(`File: ${uri} has:`.cyan);
        console.log(`✔ Total Links: ${dataLinks.length}`.brightYellow);
        console.log(`✔ Total Unique Links: ${goodLinks}`.green);
        console.log(`✖ Total Broken links: ${badLinks}\n`.red);
      }
    });
  }
}
//función stat y validate
const validateAndStats = (stats, validate) => {
  showStats(stats);
  validateLinks(validate);
}
// opciones en la terminal
const menuOptions = () => {
  if (options === '--validate') {
   console.log('Links Validate') 
   validateLinks();
  } else if (options === '--stats') {
    console.log(showStats(uri));
  } else if (options === '--validate--stats') {
    console.log(validateAndStats(uri));
  }
};
menuOptions();

const mdLink = {
  validateUri, getLinks, validateAndStats, menuOptions, showStats, validateLinks
};

module.exports = {
  mdLink
};