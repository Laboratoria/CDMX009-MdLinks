const fs = require('fs').promises;
function readFile(path) {
    return fs.readFile(path, 'utf8')
    .then(function(data){
        // console.log(data)
        return `${data}`
    })
    .catch(function(err){
        //console.log(err);
        return err;
    })
}
readFile('./README.md');

module.exports = {
    readFile,
}