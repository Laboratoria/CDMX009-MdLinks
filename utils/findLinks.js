
const chalk = require('chalk')


const findLinks = (datos) => {
    let allthelink = /\[(.*)\]\S((http|https):\/\/[^\s\n)]+)(?=\))/gim;
    let regularL = /(http|https):\/\/.*\)?/gi;
    let textReg = /\[(.*)\]/gim
    let objectLinks = [];
    let newFile = process.argv.indexOf('--file');
    let uri = process.argv[newFile + 1];
    let joinArray = []
    let linkAndtext;
    let joinObject;
  return new Promise((resolve) => {
        let noStr = datos;
        let str = noStr.toString();
        let myArray;
        while ((myArray = allthelink.exec(str)) !== null) {
            joinArray.push(myArray[0]);      
        }
        linkAndtext = joinArray;

       if (linkAndtext.length>=1){
        linkAndtext.forEach(obj => {
            let myLinks = obj.match(regularL);
            let myText = obj.match(textReg);
            let dataObject = {          
                links: myLinks,
                text: myText,
                path: uri
                            };
            objectLinks.push(dataObject)
            joinObject=objectLinks
         })
        resolve (joinObject)
       } 
        else  return (console.log (chalk.redBright("This file has no links")))
    })
}

module.exports = findLinks;

