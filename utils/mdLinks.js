const fs = require('fs');
const path = require('path');
const { urlStatus, 
        choosePath,
        getStats,
        validatePath,
        readDir } = require('./utils');

const showValidate = (userPath) =>{
    if(validatePath(userPath) == 'singleFile'){
        let mdfile = userPath;
        urlStatus(mdfile)
        .then(urls => console.log(urls))
        .catch(e => console.log(e));
    }else if (validatePath(userPath) == 'directory'){
        //console.log('Estoy en dir');
        readDir(userPath)
        .then(files => choosePath(files, userPath))
        .then(mdfile => urlStatus(mdfile))
        .then(urls => console.log(urls))
        .catch(e => console.log(e));
    }
} 

const showStats = (userPath) => {
    if(validatePath(userPath) == 'singleFile'){
        let mdfile = userPath;
        urlStatus(mdfile)
        .then(urls => getStats(urls))
        .catch(e => console.log(e));
    }else if (validatePath(userPath) == 'directory'){
        //console.log('Estoy en dir');
        readDir(userPath)
        .then(files => choosePath(files, userPath))
        .then(mdfile => urlStatus(mdfile))
        .then(urls => getStats(urls))
        .catch(e => console.log(e));
    }
}

const showValidateStats  = (userPath) => {
    if(validatePath(userPath) == 'singleFile'){
        let mdfile = userPath;
        urlStatus(mdfile)
        .then(urls => {
            console.log(urls)
            getStats(urls)
        })
        .catch(e => console.log(e));
    }else if (validatePath(userPath) == 'directory'){
        //console.log('Estoy en dir');
        readDir(userPath)
        .then(files => choosePath(files, userPath))
        .then(mdfile => urlStatus(mdfile))
        .then(urls => {
            console.log(urls)
            getStats(urls)
        })
        .catch(e => console.log(e));
    }
}

module.exports = {
    showValidate,
    showStats,
    showValidateStats
}