const validate = require('./validate');
const stats = require('./stats');
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

switch (comando) {
    case "validate":
        function val() {
        let arr= validate(data);
        return arr
        }
        val ()  
    break;
    case "stats":
        function sta() {
        let arr= stats(data);
        return arr
        }
        sta()    
    break;
    default:
        console.log("no es valido")
    break;
}  

