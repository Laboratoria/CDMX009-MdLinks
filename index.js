const read= require('./utils/readFile.js')
const findLinks= require('./utils/findLinks')
const linksFunctions= require('./utils/validateAndStatusLinks')

function allTheLinks() {
    let newFile = process.argv.indexOf('--file');
    let uri = process.argv[newFile + 1];
    let probe = uri.lastIndexOf(".");
    let typeFile = uri.slice(probe);
    if (typeFile === ".md") {
        read(uri) //para leer el archivo
            .then(content => {
                return findLinks(content)
            }) //para extraer los links
            .then(linksReal => {
                return linksFunctions.getStatusLink(linksReal)
            })

            .catch(er => console.log(er))
    }
    
    else { console.log("you need a file with an .md extention  or you are missing the flag --file  before your path") }
}
allTheLinks();



