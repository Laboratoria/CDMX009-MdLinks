const { validate, validateStats} = require('./validate');
const { getLinks, uniqueLinks,stats} = require('./stats');
const fs = require("fs")
const path = require('path');
const marked = require('marked');
//const path = require('path');

const opts={
    file:{
        demand:true,
        alias: "f"
        }
}

const argv = require("yargs")
                .command("validate","imprime en consola",opts)
                .command("stats","imprime en consola",opts)
                .command("validateStats","imprime en consola",opts)
                .argv


let data = fs.readFileSync(`${argv.file }`,"utf-8");
const links = getLinks(data)
let comando = argv._[0]

switch (comando) {
    case "validate":
        const showValidate = (links)=>{
            let arr =validate(links)
            return arr
        }
        showValidate()
    break;
    case "stats":
        function showStats(links){
            let arr1= uniqueLinks(links)
            let arr2=stats(links)
            console.log(arr1)
            return arr2
        }
        showStats(links) 
    break;
    case "validateStats":
        function showValidateStats(links){
            let arr3 =validateStats(links)
            let arr4 = uniqueLinks(links)
            return arr3 ,arr4
        }
        showValidateStats(links)
    break;
    default:
        console.log("no es valido ingresa stats , validate o validateStats")
    break;
}  