const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');

const uniqueUrls = (urls) => {
    let repeted= 0;
    let i;
    let j=i+1;;
    for(i=0; i<urls.length; i++ ) {
        for(j=i; j<urls.length; j++ ) {
            if(i != j){
                if(urls[i].href == urls[j].href){
                    repeted ++;
                }
            }    
        }
            
    }
    let unique = urls.length - repeted;
    return unique;
}


const getStats = (urls) => {
    let ok = 0;
    let broken = 0;
    urls.forEach((e) => {
        if (e.status == 'ok') {
            ok++
        } else {
            broken++
        }
    })
    console.log(chalk.yellow.bold(`Total: ${urls.length}`))
    console.log(chalk.blue.bold(`Unique: ${uniqueUrls(urls)}`))
    console.log(chalk.green.bold(`Ok: ${ok}`));
    console.log(chalk.red.bold(`broken: ${broken}`));
    return `${ok} ${broken}`;
}

const validateUrl = async(href) => {
    try {
        const response = await fetch(href);
        const data = await response.status;
        return data;
    } catch (err) {
       // console.log(err);
        return err;
    }
}

const findUrl = (mdfile) => {
    
    let data = fs.readFileSync(`${mdfile}`, 'utf8');
    let regExp = /\[(.*?)\]\(https?:\/\/[\S]*/g; 
    let urlArray = data.match(regExp);
    let urls = [];
    
    if(urlArray){
        urlArray.forEach((elem) => {
            let urlElems = elem.split(/\]\(/);
            let urlText = urlElems[0].split(/\[/);
            let urlHref = urlElems[1].split(/\)/)

            urls.push({
                "href": urlHref[0],
                "text": urlText[1],
                "File": mdfile
            })
        })
        return urls;
    }else{
        console.log(chalk.red('There are not URLs in this file'));
        return; 
        
    }    
}

const urlStatus = (mdFile) => {
    
    return new Promise ((resolve, reject) => {
        let urls = findUrl(mdFile);
        let count = 0;
        if(urls){
            urls.forEach(async(link) => {
                try {
                    const code = await validateUrl(link.href);
                    if (code == 200 | code == 301) {
                        link.code = code;
                        link.status = 'ok';
                    } else {
                        link.code = code;
                        link.status = 'broken';
                    }
                    
                    count++
                    
                    if (count == urls.length) {
                        resolve(urls); 
                    }
                } catch (err) {
                    console.log(err);
                    console.log('error');
                    reject(err);
                }
            })
        }
    });    
}

const choosePath = (files, userPath) => {
    //console.log(files);
    
    return new Promise ((resolve, reject) => {
        let filesOptions = [];
        let completePath;
        let mdFile;

        files.forEach(function(file) {
            //console.log(file);
            if(path.extname(file) == '.md'){
                if(userPath.slice(-1) == '/'){
                    completePath = userPath+file;
                }else{
                    completePath = userPath+'/'+file;
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


module.exports = {
    validatePath,
    readDir,
    choosePath,
    urlStatus,
    findUrl,
    validateUrl,
    getStats,
    uniqueUrls
}
