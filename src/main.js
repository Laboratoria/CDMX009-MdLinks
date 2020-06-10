const fetch = require('node-fetch');
const colors = require('colors');

function validateLinks (links, uri) {
    const validLinks = links.map(link => {
        return fetch(link.href)
            .then(result => {            
                if(result.status === 200) {
                    console.log(' href: ' + result.url.green + ' status: '.blue + result.status + ' OK'.green + ' ✓'.green.bold + ' ' + link.title.magenta)
                } else {
                    console.log(' href: ' + result.url.red + ' status: '.blue + result.status + ' FAIL'.bold.red +  ' ✕'.red.bold + ' ' + link.title.magenta);
                };
            })
            .catch(err => { 
                console.log('No se encontro link: ' +  result.url + 'en el archivo' );
            });
    });

    console.log('Validando links del Archivo '.blue, uri.green.bold);
    return validLinks;
};

function validateStats(arrayLinks, uri) {
    let links = arrayLinks;
    let totalLinks = arrayLinks.length;
    let goodLinks = [...new Set (arrayLinks.map(links => links.href))].length;
    let badLinks = 0;
    let promises = [];

    links.forEach(link => {
        let promise = fetch(link.href)
        .then(result => {
            if (result.status != 200) {
                badLinks++
            };
        });
        promises.push(promise);
    });
    return Promise.all(promises)
    .then(() => {
        console.log('El Archivo'.blue, uri.green.bold,  'Contiene: \n'.blue);
        console.log(' ⋆'.magenta, 'Total: '.blue + totalLinks);
        console.log(' ⋆'.magenta, 'Unique: '.green + goodLinks);
        console.log(' ⋆'.magenta, 'Ok: '.green + (goodLinks - badLinks));
        console.log(' ⋆'.magenta, 'Broken: '.red + badLinks);
        return badLinks;
    });
} ;

function linkStats (arrayLinks, uri) {
    let totalLinks = arrayLinks.length;
    let goodLinks = [...new Set (arrayLinks.map(links => links.href))].length;

    console.log('El Archivo '.blue, uri.green.bold, 'Contiene: \n'.blue);
    console.log(' ⋆'.magenta, 'Total: '.blue + totalLinks);
    console.log(' ⋆'.magenta, 'Unique: '.green + goodLinks);
};

module.exports = { validateLinks, validateStats, linkStats }