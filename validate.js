const fetch = require('node-fetch');


function validate(links){
    let promises = links.map(link=>fetch(link).then(function(link) {
        let arr =`${link.url}  ${link.statusText}  ${link.status}`
        return arr
    }).catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    }))
    return Promise.all(promises) 
       .then(r=>console.log( r ))
}

let ok = 0;
let broke = 0;
function validateStats(links) {

    let promises = links.map(link=>fetch(link).then(function(link) {

        if (link.status === 200) {
            ok ++
        }else if (link.status === 404) {
            broke ++
        }
        let arr =`\n${link.url}  ${link.statusText}  ${link.status}`
        return arr
    }).catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    }))
    return Promise.all(promises) 
       .then(r=>console.log( r+"\nbroke:" + broke + "\nok:" + ok ))
}

module.exports = {
    validate,
    validateStats
}



