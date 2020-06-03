const fetch = require('node-fetch');
const fs = require("fs")
const argv = require("yargs")
                .command("listar","imprime en consola",{
                    file:{
                        demand:true,
                        alias: "f"
                    }
                })
                .argv

let data = fs.readFileSync(`${argv.file }`,"utf-8");
let comando = argv._[0]
let work = 0;
let broke = 0;

switch (comando) {
    case "validate":
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
        validate(data)
        break;
    case "stats":
        function stats(data) {
            let urlRegex = /(https?:\/\/[^\s)]+)/gi;
            let links = data.match(urlRegex)
            //console.log(links)
        
            for(let i=0;i < links.length;i++){
                fetch(links[i]).then(function(response) {
                    let obj =`${links[i]}  ${response.statusText}  ${response.status}` 
                    console.log(obj);
                    return obj
                  }).catch(function(error) {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                  });
            }
        }
        stats(data)
        break;
    default:
        console.log("no es valido")
        break;
}  
