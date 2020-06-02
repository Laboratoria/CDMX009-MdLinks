const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const read = (file) => {
    return new Promise(function (resolve, reject) {
        let newFile = process.argv.indexOf('--file');
        let uri = process.argv[newFile + 1];
        
        if (!fs.lstatSync(file).isDirectory()) {
            let probe = file.lastIndexOf(".");
            let typeFile = file.slice(probe);
            if (typeFile === ".md") {
            fs.readFile(file, function (err, content) {
                if (err) {
                    return reject(err)
                }
                resolve(content)
                console.log(content)
            })
            } else {console.log('you neeed a file with .md extention o you miss the flag --file befoere your path :) ')}
        }
        else {
            let direc = fs.readdirSync(uri)
            direc.forEach(elemnt => {

                let lastmd = elemnt.lastIndexOf(".");
                let newF = elemnt.slice(lastmd);
                if (newF === '.md') {
                    let newPath = path.join(uri, elemnt)
                    let expR = /\\/gi;
                    let realPath = newPath.replace(expR, "\/");
                        read(realPath)
                   //resolve(read(realPath))
                   console.log("archivos del directorio", realPath)
                   

                }
                else {
                    //return undefined 1.- Promesa este fuera del if
                    // 2.- else  y hacer algo para no permitir que termine
                    
                    console.log(chalk.gray.bold("It is not a .md extention file ******" + "  " + elemnt))
                }

            })
        }
    })
}

                

module.exports= read; 