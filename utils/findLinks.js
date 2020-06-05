
const chalk = require('chalk')


const findLinks = (datos, urlF) => {
    const allthelink = /\[(.*)\]\S((http|https):\/\/[^\s\n)]+)(?=\))/gim;
    const regularL = /(http|https):\/\/.*\)?/gi;
    const textReg = /\[(.*)\]/gim
    let objectLinks = [];
    const newFile = process.argv.indexOf('--file');
    const uri = process.argv[newFile + 1];
    let joinArray = []
    let linkAndtext;
    let joinObject;
    return new Promise((resolve) => {
        const buffers = datos;
        const newStrings = buffers.toString();
        let myArray;
        while ((myArray = allthelink.exec(newStrings)) !== null) {
            joinArray.push(myArray[0]);
        }
        linkAndtext = joinArray;
        const unique = linkAndtext.filter(onlyUnique)
       
        if (unique.length >= 1) {
            unique.forEach(obj => {
                const myLinks = obj.match(regularL);
                const myText = obj.match(textReg);
                const dataObject = {
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
            const messagefail= "This .md file has no links"
            console.log(chalk.redBright(messagefail) +'****'+ chalk.yellow.bold(urlF))
        return messagefail
    }
    })
}


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}



/*filter ignora los elementos que regresen un falso, por lo tanto si cuando
 preguntas en que posición se encuentra un item
 y no corresponde con el index que tiene en el array actual 
 significa que es repetido.*/

module.exports = findLinks;

