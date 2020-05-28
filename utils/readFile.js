const fs = require('fs')
const read=(file)=> {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, function (err, content) {
            if (err) {
                return reject(err)
            }
            resolve(content)
            //console.log(content)
        })
    })
}



module.exports = read;