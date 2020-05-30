const fs = require('fs').promises;
const path = require('path'); //to get links


//Read File
const readFile = fileName => fs.readFile(fileName, 'utf8')
  .then(text => console.log(text))
  .catch(error => console.log(error))
readFile();

//Aegurar que sea un archivo markdown
const isMarkDownFile = file => {
  return new Promise((resolve) => {
    const ext = path.extname(file) === ".md";
    resolve(ext);
    console.log('ext', ext)
    });
};

isMarkDownFile('./README.md')