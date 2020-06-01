
const chalk = require('chalk')


const findLinks = (datos, urlF) => {
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
        var unique = linkAndtext.filter(onlyUnique)
        //console.log(unique)
        if (unique.length >= 1) {
            unique.forEach(obj => {
                let myLinks = obj.match(regularL);
                let myText = obj.match(textReg);
                let dataObject = {
                    links: myLinks,
                    text: myText,
                    path: uri
                };
                objectLinks.push(dataObject)
                joinObject = objectLinks
            })
            resolve(joinObject)
        }
        else {
            let messagefail= "This .md file has no links"
            console.log(chalk.redBright(messagefail) +'****'+ chalk.yellow.bold(urlF))
        return messagefail
    }
    })
}


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

// usage example:
//var a = ['a', 1, 'a', 2, '1'];
//var unique = a.filter( onlyUnique );
//console.log(unique);


//filter ignora los elementos que regresen un falso, por lo tanto si cuando
// preguntas en que posición se encuentra un item
// y no corresponde con el index que tiene en el array actual 
// significa que es repetido.

module.exports = findLinks;

