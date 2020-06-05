
function findFile() {
    let position= process.argv.slice("--file");
    // console.log(position);
    // if (position < 0) return console.log("holi, estás mal")
    let lengt= position.length;
    // console.log(lengt);
   let path= (position.slice(lengt - 1)).toString();
    if(path=="README.md"){
      return path
        }else{
        path='README.md'
        return path
    }
   
    
}

console.log(findFile());
module.exports = {
    findFile
}