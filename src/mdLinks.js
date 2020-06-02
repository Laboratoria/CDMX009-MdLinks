const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');

const stats = (urls) => {
    let ok = 0;
    let broken = 0;

    urls.forEach((e) => {
        if (e.status == 'ok') {
            ok++
        } else {
            broken++
        }
    })
    console.log(chalk.green.bold(`Url Ok: ${ok}`));
    console.log(chalk.red.bold(`Url broken: ${broken}`));
}

const validateUrl = async(href) => {
    try {
        const response = await fetch(href);
        const data = await response.status;
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

const findUrl = (mdfile) => {
    
    let data = fs.readFileSync(`${mdfile}`, 'utf8');
    let regExp = /\[(.*?)\]\(https?:\/\/[\S]*/g; 
    let urlArray = data.match(regExp);
    let urls = [];
    
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
}

const urlStatus = (mdFile) => {
    
    return new Promise ((resolve, reject) => {
        let urls = findUrl(mdFile);
        let count = 0;
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
                reject(err);
            }
        })
    });    
}

module.exports = {
    urlStatus,
    findUrl,
    validateUrl,
    stats
}