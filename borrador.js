
//Validating links

async function allLinks () {
    await matches.forEach(element => fetch(element)
    .then(res => 
      console.log('Validating links','\n url:', res.url, '\n status:', res.status, '\n statusText:', res.statusText)));
    //let d = await fetch(element).then(res => console.log(res))
}
allLinks();
    //await fetch (ele).then(res => console.log(res));
    //console.log('all links', matches[0])}


/* allLinks(); */
//let ab = matches.forEach(element => console.log('ELEMENT', element)) 

/* fetch(matches)
.then(res => 
console.log('RESULT FETCH', res.status, '\n url:', res.url,'\n status:', '\n statusText:', res.statusText))   */









const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const chalk = require('chalk');
let file;
let string;
let matches = [];

//Find file
const fileLinks = () => {
  matches = string.match(/\bhttps?:\/\/\S+/gi);
  return matches
  //console.log('match: ', matches);
}

const reading = () => {
  let pathFile = path.extname(file)
  if (pathFile === '.md') {
    string = fs.readFileSync(file, 'utf-8');
    let links = fileLinks(string);
    console.log('path: ', pathFile)
    console.log('links: ', links);
  }
  else{
    console.log('path: ', pathFile, '\n Ingresa únicamente archivos .md');
  }
}
//reading();

const indexFile = () => {
  let fileFlag = process.argv.indexOf('--file');
  if (fileFlag > 0) {

  file = process.argv[fileFlag + 1];
  let directory = process.cwd();
  reading();
  return console.log('file:', file, '\n dir: ', directory);
  }
  else{
    console.log('Ingresa un archivo seguido de --file')
  }
}
indexFile();


function validateLinks() { 
  let promises = matches.map(element=>fetch(element))
  return Promise.allSettled(promises)
  .then(res=>{
    let final = res.map(result=>{
      return {
        url: result.value ? result.value.url:"error", 
        status:result.value ? result.value.status:"error", 
        text:result.value ? result.value.statusText:"error"
      }
    })
    console.log(final)
    return final
  })
}
validateLinks()
 

module.exports = indexFile;








function validateLinks() { 
  let promises = matches.map(element=>fetch(element))
  return Promise.allSettled(promises)
  .then(res=>{
    let final = res.map(result=>{
      let okStatus = [];
      let brokeStatus = [];
      let allStatus = [];
      let validate = 
       {
        url: result.value ? result.value.url:"error", 
        status:result.value ? result.value.status:"error", 
        text:result.value ? result.value.statusText:"error"
      }
      
      //let statsAgain = [validate.url, validate.status]

      //console.log(statsAgain, 'again');
      //console.log(statsAgain.length, 'lenght');

      validate.status === 200 ? okStatus.push(validate) : brokeStatus.push(validate.status)
      console.log('ok status' , okStatus)
 

/*                         let items = [80, 45, 90, 65, 74, 100, 85, 30]

                  let result = items.reduce((obj, item) => {
                    item < 75 ? obj.fail.push(item) : obj.pass.push(item)
                    return obj
                  }, {pass:[], fail:[]})

                  console.log(result) */
 

/* 
      if (obj.status === 200)
      okStatus.push(obj.url);
      console.log('oki', okStatus); */



      return validate
    })
    console.log('final', final)
    //console.log('obj', obj.status)
    return final
  })
}
validateLinks()  