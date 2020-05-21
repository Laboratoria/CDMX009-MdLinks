function init (){
    const { readFile } = require('./readFile');
    const { findFile } = require('./findFile');
    readFile(findFile);
};

init();