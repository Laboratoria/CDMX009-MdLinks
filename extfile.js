//Verificar que el archivo sea .md markdown

const path = require('path'); //to get links

const isMarkDownFile = file => {
    const ext = path.extname(file) === ".md";
    console.log('ext', ext)   
};

isMarkDownFile('readme.md');

module.exports = { isMarkDownFile };