const md = require('./mdLinks.js');
const fs = require('fs');
const path = require('path');
const url = require('url');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const http = require('http');


const findUrl = (data) =>{
    //console.log(data);
    //let re = new RegExp('y');
    //let re = /https?:\/\// ///https:/;
    let dataArray = data.split(/\s|\]\(/);
    //let dataElem = dataArray.split('](');
    //console.log(data.match(/https:\/\//));  
    let numUrl = 0;
    dataArray.forEach((e) => {
        //console.log(e);
        //let elem = e.split('](');
        
        if(e.match(/https:\/\//) || e.match(/http:\/\//) ){
            let url = e.slice(0,-1)
            console.log(url);
            numUrl ++
            
        }
       
    });
    console.log('No. Url: '+ numUrl);
}


const showFile = (pathIndex) => {
    let fileExt = path.extname(process.argv[pathIndex]);
    //let fileExt = path.slice(-3,);
    if (fileExt == '.md') {
        console.log(fileExt);
        let data = fs.readFileSync(`${process.argv[pathIndex]}`,'utf8');
        //console.log(data);
        findUrl(data);
    }else{
        console.log('This is not a markdown file, please try again');
    }
}


const choosePath = () =>{
    process.argv.forEach((val, index)=>{
        console.log(`${index}: ${val}`);
        console.log(path.extname(val));
    });

    readline.question(`Select the number of the file path you want: `, (pathIndex) => {
        console.log(`You chose number: ${pathIndex}`);
        readline.close()
        showFile(pathIndex);
    })
}


choosePath();
