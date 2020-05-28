const md = require('./mdLinks.js');
const fs = require('fs');
const path = require('path');
const url = require('url');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const http = require('http');
const fetch = require('node-fetch');
const chalk = require('chalk') 
//const cowsay = require('cowsay');


const stats = (urls) =>{
    let ok = 0;
    let broken = 0;
    //console.log(count);
    urls.forEach((e)=>{
        if(e.status == 'ok'){
            ok ++ 
        }else{
            broken ++
        }
    })
    console.log(`Url Ok: ${ok}`);
    console.log(`Url broken: ${broken}`);
    //setTimeout(function(){console.log(urls.length)}, 5000);
}

const validateUrl = async (href) =>{
    try{
        const response = await fetch(href);
     // if(!response.ok) throw new Error("No hay ningún título relacionado");
        const data = await response.status;
      //console.log(data);
        return data;
    }catch (err){
        console.log(err);
        return err;
    }
} 

const urlStatus = async (urls) => {
    //console.log(urls[0].href);
    let count = 0;
    
    urls.forEach( async (link)=>{
        try{
            const code = await validateUrl(link.href);
                        
            if(code == 200){
                //console.log(`Url: ${href} Status: ${code}`);
                link.code = code;
                link.status = 'ok'; 
                console.log(link);   
            }else{
                //console.log(`Url: ${href} Status: ${code}`);
                link.code = code;
                link.status = 'broken';
                console.log(link); 
                //console.log(broken)
            }
            count ++
            if(count == urls.length){
                stats(urls);
            }
        }catch (err){
            console.log(err);
            return err;
        }    
    })
    //console.log(urls);
}

const findUrl = (data,file) =>{
    let regExp = /\[[\w\s]*\]\(https?:\/\/[\S]*/g;
    let urlArray = data.match(regExp);
    let urls = [];
    //console.log(urlArray);
    //console.log(file);
    urlArray.forEach((elem)=>{
        let urlElems =  elem.split(/\[|\]\(|\)/);
        //console.log(urlElems);
        urls.push({
            "href": urlElems[2],
            "text": urlElems[1],
            "File": file
        })
    })

    console.log(urls);
    console.log(`Total url: ${urls.length}`);
       
    urlStatus(urls);
}

const showFile = (pathIndex) => {
    let fileExt = path.extname(process.argv[pathIndex]);
    if (fileExt == '.md') {
        //console.log(fileExt);
        let file = process.argv[pathIndex];
        let data = fs.readFileSync(`${file}`,'utf8');
        //console.log(data);
        findUrl(data, file);
    }else{
        console.log('This is not a markdown file, please try again');
    }
}

const choosePath = () =>{
    process.argv.forEach((val, index)=>{
        console.log(`${index}: ${val}`);
        //console.log(path.extname(val));
    });

    readline.question(`Select the number of the file path you want: `, (pathIndex) => {
        console.log(chalk.blue(`You chose number:${pathIndex}`));
        readline.close()
        showFile(pathIndex);
    })
}

choosePath();




    /*
    urls.forEach((link)=>{
       //console.log(link.href);
        let href = link.href;
       validateUrl(href).then((code)=>{
            if(code == 200){
                //console.log(`Url: ${href} Status: ${code}`);
                found.push({
                    'href': href,
                    'code': code,
                    'status': ok
                })
            }else{
                //console.log(`Url: ${href} Status: ${code}`);
                broken.push({
                    'href': href,
                    'code': code,
                    'status': broken
                })
                //console.log(broken)
            }
            
       }).then(()=>{
        console.log(`Ok: ${found}, Broken: ${broken}`)

       }).catch(err=>console.log( err ))
    });*/