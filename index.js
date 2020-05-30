const read= require('./utils/readFile.js')
const findLinks= require('./utils/findLinks')
const linksFunctions= require('./utils/validateAndStatusLinks')


function allTheLinks() {
    let newFile = process.argv.indexOf('--file');
    let uri = process.argv[newFile + 1];
    console.log('uri',uri)
    let comandLine4 = process.argv[4]
    let comandLine5 = process.argv[5]
    //let fileReal=fs.readFileSync(uri, 'utf-8')
    read(uri) 
    //para leer el archivo
        .then(content => {
            return findLinks(content)
        }) //para extraer los links
        .then(linksReal => {
            return linksFunctions.getStatusLink(linksReal, comandLine4, comandLine5)
        })
        .catch(er => console.log(er))
}
allTheLinks();


