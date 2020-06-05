const fetch = require('node-fetch');

let work = 0;
let broke = 0;

function validate(data) {
    let urlRegex = /(https?:\/\/[^\s)]+)/gi;
    let links = data.match(urlRegex)
    let i=0
    fetch(links[i]).then(function(response) {
        for( i ;i < links.length;i++){
            if (response.status == 200) {
            work += 1;

            }else if (response.status == 404) {
            broke +=1;

            }}
            console.log(`funciona:${work} roto:${broke} total:${links.length}`)
            return `funciona:${work} roto:${broke} total:${links.length}`
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}


module.exports = validate;