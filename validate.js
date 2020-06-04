const fetch = require('node-fetch')
const chalk = require('chalk');

let validated = [];

function stats (array){
    console.log(chalk.bgHex('#ffc6ff')("total:",array.length));
          console.log(chalk.bgGreen("Buenos: ",array.reduce((acc, el)=>{
              if(el.status<400) return acc+=1
              return acc
          },0)))
          console.log(chalk.bgRed("Malos: ",array.reduce((acc, el)=>{
               if(el.status>=400 || el.status==="Error") return acc+=1
               return acc
           },0)))
}

function validate(array) {
    array.map(element => {
        if (element.status >= 400 || element.status ==="Error"){
            let stringify = JSON.stringify(element.url)
            console.log(chalk.blueBright(stringify + " Status: 404"))
        } else console.log(chalk.yellow(element.url + " Status: 200"))
    })
}

function array(links){
    let promises = links.map(link=>fetch(link)
                                    .then(res=> validated.push(({url: link,text:res.statusText,status:res.status, boolean:true })))
                                    .catch(err=>validated.push(({url: link,status:"Error",text:err.message, boolean: false})))) 
    return Promise.all(promises)
        .then(
            results => {
                validate(validated)
                stats(validated)
            return results
        }
        )
}


module.exports = {
    array,
}