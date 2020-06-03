#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { urlStatus,
    findUrl,
    validateUrl,
    stats } = require('./mdLinks');

const opts = {
    file: {
        demand: true,
    }
}

const argv = require('yargs')
    .command('validate', 'Validate URLs status in a markdown file', opts)
    .command('stats', 'Give the number of ok and broken URLs in a markdown file', opts)
    .command('validateStats', 'Validate and stats URLs in a markdown file', opts)
    .help()
    .argv;


let command = argv._[0];

//*** */

const choosePath = (files) => {
    //console.log(files);
    
    return new Promise ((resolve, reject) => {
        let filesOptions = [];
        let completePath;
        let mdFile;

        files.forEach(function(file) {
            //console.log(file);
            if(path.extname(file) == '.md'){
                if(argv.file.slice(-1) == '/'){
                    completePath = argv.file+file;
                }else{
                    completePath = argv.file+'/'+file;
                }
                filesOptions.push(completePath);
            }
        });

        if(filesOptions.length != 0){
            filesOptions.forEach((file, index)=>{
                console.log(chalk.yellow(`${index}: ${file}`));
            })
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
        
            readline.question(`Select the number of the file path you want: `, (pathIndex) => {
                console.log(chalk.cyan(`You chose number:${pathIndex}`));
                readline.close()
                mdfile = filesOptions[pathIndex];
                resolve (mdfile);
            })
           
        }else{
            console.log(chalk.red('there is not a valid file'));
        }
        
    });    
}

const readDir = (userPath) => {
    return new Promise ((resolve, reject) => { 
        fs.readdir(userPath, function(err, files) {
            
            if (err) {
                reject (err) 
                console.log(chalk.red('Unable to scan directory: ' + err));
            }
            resolve (files);
        })
    });
}

const validatePath = (userPath) => {
    let pathFile = fs.statSync(userPath);
    if (pathFile.isFile()) {
        if (path.extname(userPath) == '.md') {
            return 'singleFile';
        } else {
            console.log(chalk.red('This is not a markdown file, please try again'));
        }
    }else if (pathFile.isDirectory()) {
        return 'directory';
        
    } else {
        console.log(chalk.red('Path no valid'));
    }
}



switch (command) {
    
    case 'validate':
        console.log(chalk.cyan.bold('Option: Validate'));
        if(validatePath(argv.file) == 'singleFile'){
            let mdfile = argv.file;
            urlStatus(mdfile)
            .then(urls => console.log(urls))
            .catch(e => console.log(e));
        }else if (validatePath(argv.file) == 'directory'){
            //console.log('Estoy en dir');
            readDir(argv.file)
            .then(files => choosePath(files))
            .then(mdfile => urlStatus(mdfile))
            .then(urls => console.log(urls))
            .catch(e => console.log(e));
        }
        
        break;

    case 'stats':
        console.log(chalk.cyan.bold('Option: Stats'));
        if(validatePath(argv.file) == 'singleFile'){
            let mdfile = argv.file;
            urlStatus(mdfile)
            .then(urls => stats(urls))
            .catch(e => console.log(e));
        }else if (validatePath(argv.file) == 'directory'){
            //console.log('Estoy en dir');
            readDir(argv.file)
            .then(files => choosePath(files))
            .then(mdfile => urlStatus(mdfile))
            .then(urls => stats(urls))
            .catch(e => console.log(e));
        }
        
        break;

    case 'validateStats':
        console.log(chalk.cyan.bold('Option: ValidateStats'));
        if(validatePath(argv.file) == 'singleFile'){
            let mdfile = argv.file;
            urlStatus(mdfile)
            .then(urls => {
                console.log(urls)
                stats(urls)
            })
            .catch(e => console.log(e));
        }else if (validatePath(argv.file) == 'directory'){
            //console.log('Estoy en dir');
            readDir(argv.file)
            .then(files => choosePath(files))
            .then(mdfile => urlStatus(mdfile))
            .then(urls => {
                console.log(urls)
                stats(urls)
            })
            .catch(e => console.log(e));
        }
        
        break;
    default:
        console.log('Unrecognized command line');

}


module.exports = {
    validatePath,
    readDir,
    choosePath,
    
}
