const fetch = require('node-fetch');
        
function stats(data) {
    let urlRegex = /(https?:\/\/[^\s)]+)/gi;
    let links = data.match(urlRegex)
    

    for(let i=0;i < links.length;i++){
        fetch(links[i]).then(function(response) {
            let arr =`${links[i]}  ${response.statusText}  ${response.status}` 
            console.log(arr);
            return arr
        }).catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
        });
    }
}

module.exports = stats;