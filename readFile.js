const fs = require('fs').promises;
const { showLinks } = require('./showLinks');

function readFile(path) {
    return fs.readFile(path, 'utf8')
    .then(function(data){
        showLinks(data);
        return `${data}`
    })
    .catch(function(err){
        return err;
    })
}
module.exports = {
    readFile,
}