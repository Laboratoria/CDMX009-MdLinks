const chalk = require('chalk');

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
module.exports = {
    stats
}