const fs = require('fs')
const path = require('path')

const read=(file)=>  {
    let newFile = process.argv.indexOf('--file');
    let uri = process.argv[newFile + 1];
    let newPath;
    if (!fs.lstatSync(file).isDirectory()) {
        let probe = file.lastIndexOf(".");
        let typeFile = uri.slice(probe);
         return new Promise(function (resolve, reject) {
            if (typeFile === ".md") {
                fs.readFile(file, function (err, content) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(content)
                    console.log(content)
        })
    } else {console.log('you neeed a file with .md extention o you miss the flag --file befoere your path :) ')}
    })
}
    else {
            let direc= fs.readdirSync(file)
                   direc.forEach(elemnt=>{
                       let newF= path.extname(elemnt)
                         //console.log(newF)
                       if (newF === '.md') {
                        newPath = path.join(uri, elemnt)
                        let expR= /\\/gi;
                        let realPath= newPath.replace(expR, "\/");
                        console.log(realPath)
                        read(realPath);
                        }
                   })    
                }  
}
module.exports= read; 