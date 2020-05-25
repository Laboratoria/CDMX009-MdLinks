const fs = require("fs");
const path = require("path");
const fetch = require('node-fetch');
let index = process.argv.indexOf("--file");
let uri = process.argv[index + 1];
let options = process.argv[index + 2];
let data = fs.readFileSync(uri, 'utf8')


//Se verifica que el archivo sea .md
const readMd = (uri) => {
  const fileExtencion = path.extname(uri);
  if (fileExtencion != '.md') {
      console.log ('Introduce un archivo .md válido');
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

// función para validar
const readPathStatus = ()  => {
  myProcData = links(data)
  let wrongLinks = 0;
  let rightLinks = 0;
  for (let i = 0; i < myProcData.length; i++) {
    fetch(myProcData[i].link).then(response => {
      if (response.status == 200) {
        rightLinks++;
      } else if (response.status == 404 || response.status == 400) {
        wrongLinks++;
      } else {
        console.log('error', response.status);
      }
      //se muestran los resultados de los links
      if (wrongLinks + rightLinks === myProcData.length) {
        console.log(`File: ${uri} has:`);
        console.log(`✔ Total Links: ${myProcData.length}`);
        console.log(`✔ Total Unique Links: ${rightLinks}`);
        console.log(`✖ Total Broken links: ${wrongLinks}\n`);
      }
    });
  }
}

// opciones en la terminal
const menuOptions = () => {
  if (options === '--validate') {
   console.log('Links Validate') 
   readPathStatus();
  } //else if (options === '--stats') {
    //console.log(readStats(uri));
  } //else if (options === '--validate--stats') {
    //console.log(validateAndStats(uri));
  //}
//};
menuOptions();

const mdLink = {
  readMd, links, menuOptions, readPathStatus
};

module.exports = {
  mdLink
};