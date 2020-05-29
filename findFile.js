const { readFile } = require('./readFile');
function findFile() {
    let position= process.argv.slice("--file");
    // if (position < 0) return console.log("holi, estás mal")
    let length= position.length;
    let route= (position.slice(length - 1)).toString();
    readFile(route);
    return route;
}

findFile();


module.exports = {
    findFile
}