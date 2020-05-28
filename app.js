//The app must read a file
function readFile() {
    let fs = require('fs');
    let index = process.argv.indexOf("--file");
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1];

    let fileInformation = fs.readFileSync(uri, 'utf8');

    console.log(process.argv);
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileInformation);

}
readFile();