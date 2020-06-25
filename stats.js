

const fs = require("fs")
const fetch = require('node-fetch');

//let data = fs.readFileSync('./new.md',"utf-8");

const getLinks = (data)=>{
    let urlRegex = /(https?:\/\/[^\s)]+)/gi;
    let links = data.match(urlRegex)
    return links
}
//let links = getLinks(data)

const uniqueLinks = (links) => {
    let repeted= 0;
    let i;
    let j=i+1;;
    for(i=0; i<links.length; i++ ) {
        for(j=i; j<links.length; j++ ) {
            if(i != j){
                if(links[i] == links[j]){
                    repeted ++;
                }
            }    
        }
            
    }
    let unique = links.length - repeted;
    return "Unique:" + unique;
}
//console.log(uniqueLinks(links))

let ok = 0;
let broke = 0;

function stats(links){
    let promises = links.map(link=>fetch(link).then(function(link) {
        if (link.status === 200) {
            ok ++
        }else if (link.status === 404) {
            broke ++
        }
    }).catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    }))
    return Promise.all(promises) 
       .then(r=>console.log( "broke:" + broke + "\nok:" + ok ))
}
//statsLinks(links)
module.exports = {
    getLinks,
    uniqueLinks,
    stats
}