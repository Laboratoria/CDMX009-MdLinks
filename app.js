const fs = require('fs')
const marked = require('marked')
const path = require('path')
const fetch = require('node-fetch');
const colors = require('colors')
const {validateLinks, linkStats, validateStats } = require('./utils.js') 

let index = process.argv.indexOf("--file")
let flags = process.argv

function getUri() {
    let uri = process.argv[index + 1]
    let ext = path.extname(uri)
        if (index<0) {
             console.log('Please use the', '--file'.cyan, 'flag before writing the path of the file (--file example.md)')
             return false
        } else if (ext != '.md') {
             console.log('File must be a markdown file (.md)')
             return false
        } else {
            return uri
        }
}

function readFile(uri) { 

    if (fs.existsSync(uri)){
        let content = fs.readFileSync(uri, 'utf8') 
        return content
    }else {
        console.log('File', uri.cyan, 'doesnt exist or is not available in this directory')
        return false
    }
}

function getLinks(content){
    let linksArr = []
    let renderer = new marked.Renderer() 
    renderer.link = ( href, file, text ) =>{
         linksArr.push({
            href: href,
            title: text.slice(0,50),
            path: file
        })
    }
    marked(content, { renderer: renderer })
    return linksArr
}

async function main(){
    let uri = getUri() 
        if(uri != false) {
            let content = readFile(uri)
            if(content != false){
                let linksArr = getLinks(content)
                if (linksArr.length <= 0) return console.log('File', uri.cyan, 'has no links!')
                if (flags.includes('--validate') && flags.includes('--stats') || flags.includes('--v') &&flags.includes('--s')){
                    validateStats(linksArr, uri)
                } else if (flags.includes('--validate') || flags.includes('--v')){
                    validateLinks(linksArr, uri)
                } else if (flags.includes ('--stats') || flags.includes('--s')){
                    linkStats(linksArr, uri)    
                } else {
                if(linksArr != '')
                console.log('Your file ' + uri.cyan  + ' contains the following links: \n')
                linksArr.forEach(link => {
                    console.log('   ⋆ '.yellow + link.href + '  ' + link.title)
                })
              }       
            }
    }
}

module.exports = { 
    main,
    getLinks,
    linkStats,
    getUri
}