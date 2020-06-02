const path = require('path');

//The app must read a file
function readFile() {
    let fs = require('fs');
    let index = process.argv.indexOf("--file"); //flag--> --file
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1]; // uri --> is the location of my links

    let fileInformation = fs.readFileSync(uri, 'utf8');

    console.log(process.argv); // process.argv-----> returns an array(matriz) containing the command line arguments passed in this case README.md
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileInformation);

}
readFile();

// make sure it's a markdown file
function checkItIsAMarkdownFile(file) {
    const ext = path.extname(file) === ".md";
    console.log('ext', ext)
}
checkItIsAMarkdownFile('./README.md');
//node app.js --file README.md