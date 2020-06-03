//Verificar que el archivo sea .md markdown

const path = require('path'); //to get links

const isMarkDownFile = file => {
  return new Promise((resolve) => {
    const ext = path.extname(file) === ".md";
    resolve(ext);
    console.log('ext', ext)
    });
};

isMarkDownFile('./README.md')