const fetch = require('node-fetch')
const colors = require('colors')

function validateLinks (links, uri) {
    const validatedLinks = links.map( link => {
        return fetch(link.href)
            .then( res => {
            
                if( res.status === 200 ){
                    console.log('   href: ' + res.url + ' status: ' + res.status + ' OK'.bold + ' ✓'.green)
                }else {
                    console.log('   href: ' + res.url + ' status: ' + res.status + ' FAILED'.bold +  ' ✕'.red)
                } 
            }).catch( err => { 
                    console.log('Couldnt fetch the folowing link: ' +  res.url + '☹' )
            })
    })
    console.log('Validated links from your', uri.cyan, 'file: \n')
    return validatedLinks
}

function validateStats(linksArr, uri) {
    let links = linksArr
    let totalLinks = linksArr.length
    let uniqueLinks = [...new Set (linksArr.map(links => links.href))].length  
    let brokenLinks = 0
    let promises = []

    links.forEach(link => {
        let promise = fetch(link.href)
        .then(res => {
            if (res.status != 200) {
                brokenLinks++
            }
        })
        promises.push(promise)
    })
    return Promise.all(promises)
    .then(() => {
        console.log('Your file', uri.cyan,  'contains: \n')
        console.log('   ⋆'.yellow, 'Total: ' + totalLinks)
        console.log('   ⋆'.yellow, 'Unique: ' + uniqueLinks)
        console.log('   ⋆'.yellow, 'Broken: ' + brokenLinks)
        return brokenLinks
    })
} 

function linkStats (linksArr, uri){
    let totalLinks = linksArr.length
    let uniqueLinks = [...new Set (linksArr.map(links => links.href))].length 

    console.log('Your file', uri.cyan, 'contains: \n')
    console.log('   ⋆'.yellow, 'Total: ' + totalLinks)
    console.log('   ⋆'.yellow, 'Unique: ' + uniqueLinks )
}

module.exports = { 
    validateLinks, linkStats, validateStats
}