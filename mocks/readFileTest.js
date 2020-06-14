const fs = require('fs').promises;
function file(path) {
    return fs.readFile(path, 'utf8')
    .then(function(data){
        return `${data}`
    })
    .catch(function(err){
        return err;
    })
}
module.exports = {
    file,
}