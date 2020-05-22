const fs = require('fs')
const marked = require('marked')
const path = require('path')
const fetch = require('node-fetch');
const colors = require('colors')

let workingLinks = 0;
let failed = 0; 

function getArgs(){
    let index = process.argv.indexOf("--file")
    if (index<0) return console.log('Please use the --file flag before writing the path of the file (--file example.md)')
    let uri = process.argv[index + 1]
    let ext = path.extname(uri)
    if (ext != '.md') return console.log('File must be a markdown file (.md)'.rainbow)
    readFile(uri)
}

function readFile(uri){
    let content = fs.readFileSync(uri, 'utf8')
    let absolutePath = path.resolve(uri)  
    getLinks(content, absolutePath) 
}

function getLinks(content, absolutePath){
    let linksArr = []
    let renderer = new marked.Renderer() 
    renderer.link = ( href, file, text ) =>{
        return linksArr.push({
            href: href,
            title: text.slice(0,50),
            path: absolutePath
        })
    }
    marked(content, { renderer: renderer })
    verifyLinks(linksArr)
}

//return 200 OK // 404 NOT FOUND 
function verifyLinks(links) {
    const validateLinks = links.map( link => {
        fetch(link.href)
            .then( res => {
                if( res.status === 200 ){
                    res.url
                    res.status
                    res.statusText 
                    console.log('href: ' + res.url + ' status: ' + res.status + ' OK'.bold + ' ✓'.green)
                }else {
                    res.url
                    res.status
                    res.statusText
                    console.log('href: ' + res.url + ' status: ' + res.status + ' FAILED'.bold +  ' ✕'.red)
                } 
            })
    })
    return validateLinks
}

getArgs()

