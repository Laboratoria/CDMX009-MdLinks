// la app debe leer un archivo
function readFile() {
    let fs = require('fs'); 
    let index = process.argv.indexOf("--file"); 
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1];
    let fileContent = fs.readFileSync(uri, 'utf8');

    console.log(process.argv);
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileContent);
}

readFile();

/* let fs = require('fs');

fs.readFile('README.md', 'utf-8', (err, data) => {
    if(err) {
        console.error('error', err);
    } else {
        console.log(data);        
    }

    console.log(process.argv);
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileContent);

}) */






