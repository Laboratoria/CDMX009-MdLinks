const fetch = require('node-fetch');
const colors = require('colors');

function validateLinks (links, uri) {
    const validLinks = links.map(link => {
        return fetch(link.href)
            .then(res => {            
                if(res.status === 200) {
                    console.log('href: ' + res.url + ' status: ' + res.status + ' OK'.bold + ' ✓'.green)
                } else {
                    console.log('href: ' + res.url + ' status: ' + res.status + ' FAIL'.bold +  ' ✕'.red);
                };
            })
            .catch(err => { 
                console.log('No se encontro link: ' +  res.url + 'en el archivo' );
            });
    });

    console.log('Validando links del Archivo '.blue, uri.green.bold);
    return validLinks;
};

function validateStats(arrayLinks, uri) {
    let links = arrayLinks;
    let totalLinks = arrayLinks.length;
    let goodLinks = [...new Set (arrayLinks.map(links => links.href))].length  
    let badLinks = 0
    let promises = []

    links.forEach(link => {
        let promise = fetch(link.href)
        .then(res => {
            if (res.status != 200) {
                badLinks++
            }
        })
        promises.push(promise)
    })
    return Promise.all(promises)
    .then(() => {
        console.log('El Archivo', uri.cyan,  'Contiene: \n')
        console.log('   ⋆'.yellow, 'Total: ' + totalLinks)
        console.log('   ⋆'.yellow, 'Unique: ' + goodLinks)
        console.log('   ⋆'.yellow, 'Broken: ' + badLinks)
        return badLinks
    })
} 

function linkStats (arrayLinks, uri) {
    let totalLinks = arrayLinks.length
    let goodLinks = [...new Set (arrayLinks.map(links => links.href))].length 

    console.log('El archivo ', uri.cyan, 'contiene: \n')
    console.log('   ⋆'.yellow, 'Total: ' + totalLinks)
    console.log('   ⋆'.yellow, 'Unique: ' + goodLinks )
}

module.exports = { validateLinks, validateStats, linkStats }