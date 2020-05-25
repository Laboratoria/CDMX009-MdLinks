const path = require('path');
const fs = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');

let inputDoc = process.argv[2];

// Funcion para validar que ingresaron path
const validateArgvExist = (inputPath) => {
    if (inputPath === undefined) {
        console.log('Necesitas ingresar una ruta o nombre de archivo correcto para continuar');
    } else inputPath;
};

// funcion para validar extensión del archivo
const validateExt = (inputFile) => {
    new Promise ((resolve, reject) => {
        let mdExt = path.extname(inputFile, 'utf-8');
        if (mdExt === '.md') {
            console.log('ok ' + mdExt);
            resolve(inputFile)
        } reject('invalid format, try again');
    });
};

// funcion para leer el archivo y obtener links
const readFile = (inputFile) => {
    new Promise ((resolve, reject) => {
        fs.readFile(inputFile, (err, data) => {
            if (err) {
                reject (err);
            }else {
                const markdown = fs.readFileSync(inputFile).toString();
                let links = markdownLinkExtractor(markdown);
                links.forEach(function (link) {
                    fetch(link).then((res) => {
                        console.log(res);
                        // console.log(`url: ${res.url}- status: ${res.status}`);
                    })
                    // console.log(link);
                });
                resolve (links);  
            };
        });
    });
};

validateArgvExist(inputDoc);
validateExt(inputDoc);
readFile(inputDoc);
