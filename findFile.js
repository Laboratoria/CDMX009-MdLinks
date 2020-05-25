const { readFile } = require('./readFile');
function findFile() {
    let position= process.argv.slice("--file");
    console.log(position);
    // if (position < 0) return console.log("holi, estás mal")
    let lengt= position.length;
    console.log(lengt);
    let path= (position.slice(lengt - 1)).toString();
    readFile(path);
    return path;
}

findFile();


module.exports = {
    findFile
}