const fetch = require('node-fetch');
const colors = require('colors');

function validateLinks(links, uri) {
    let validLinks = links.map(link => {
        return fetch(link.href)
            .then(result => {            
                if(result.status === 200) {
                    console.log(' href: ' + result.url.green + ' status: '.blue + result.status + ' OK'.green + ' ✓'.green.bold + ' ' + link.title.magenta)
                } else if(result.status === 404) {
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
    let promiseResultLinks = [];

    links.forEach(link => {
        let promise = fetch(link.href)
        .then(result => {
            if (result.status != 200) {
                badLinks++
            };
        });
        promiseResultLinks.push(promise);
    });
    return Promise.all(promiseResultLinks)
    .then(() => {
        console.log('El Archivo'.blue, uri.green.bold,  'Contiene: \n'.blue);
        console.log(' ⋆'.blue, 'Unique: '.green + goodLinks);
        console.log(' ⋆'.blue, 'Ok: '.green + (goodLinks - badLinks));
        console.log(' ⋆'.blue, 'Broken: '.red + badLinks);
        console.log(' ⋆'.blue, 'Total: '.blue + totalLinks + '\n');
        return badLinks;
    });
} ;

function linkStats (arrayLinks, uri) {
    let totalLinks = arrayLinks.length;
    let goodLinks = [...new Set (arrayLinks.map(links => links.href))].length;

    console.log('El Archivo '.blue, uri.green.bold, 'Contiene: \n'.blue);
    console.log(' ⋆'.blue, 'Unique: '.green + goodLinks);
    console.log(' ⋆'.blue, 'Total: '.blue + totalLinks + '\n');
};

module.exports = { 
    validateLinks, 
    validateStats, 
    linkStats
}