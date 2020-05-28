let { mdLinks } = require('./app.js')
/* function mdLinks(route, options) {
    //console.log(route);
    //let read = readFile(route)
    //console.log(read);
    let search = searchLinks(route)
    //console.log(search);
    //let links = search.links
    //console.log(links);
    if (options) {
        let links = search.links
        return verifyLinks(links).then(resp => resp).catch(err => err);

    } else {
        return new Promise(resolve => resolve(searchLinks(route)))
        /* return new Promise((resolve, reject) => {
            let arrLinks = links.map(link => {
                let objResult = { file: link, href: search.path }
                return objResult
            })
            resolve(arrLinks)
        }) */
//}

//} */
mdLinks('src/file.md', { validate: true }).then(resp => console.log(resp)).catch(err => console.log('error:', err))



