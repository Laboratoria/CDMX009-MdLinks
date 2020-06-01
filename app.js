let fs = require("fs");
let path = require("path");
let fetch = require("node-fetch");
let chalk = require("chalk");

const mdLinks = {};

function findFile() {
  //console.log("process ", process.argv);
  let index = process.argv.indexOf("--file");
  if (index < 0) {
    return console.log("Necesitas usar la flag --file con un uri valido");
  } else {
    let uri = process.argv[index + 1];
    //console.log("uri ", uri);
    let fileExt = path.extname(uri);
    //console.log("extension ", fileExt);
    if (fileExt === ".md") {
      readFiles(uri);
      return uri;
    } else {
      return console.log("por favor ingresa un archivo con esxtensión '.md'");
    }
  }
}
function readFiles(uri) {
  let fileContent = fs.readFileSync(uri, "utf-8");
  //console.log("todo el texto aqui ", fileContent)
  getLinks(fileContent, uri);
  return fileContent;
}

function getLinks(fileContent, uri) {
  let regexMarkdown = /\[(.+)\]\s(https?:.+?\S+)/gim; //obtiene las etiquetas y links sin parentesis
  let regexURL = /https?:.+?\S+/gim;
  let regexLabel = /\[(.+)\]\s/gim; //este regex trae todo lo que tenga []
  let deleteBrackets = fileContent.replace(/[\(\)]/gim, " "); //aqui quitamos los parentesis y ponemos espacios
  let matchMd = deleteBrackets.match(regexMarkdown); //trae los que coincidan con etiquetas y links
  let matchURL = deleteBrackets.match(regexURL); //trae solo los links
  //console.log("etiquetas y links ",matchMd)
  //console.log("long l&l ", matchMd.length + " markdown")
  //console.log("match url ", matchURL);
  //console.log("log match url ", matchURL.length+ " links")
  //consultLinks(matchURL,regexURL,uri)
  //console.log(links)
  consultLinks(matchMd, uri, regexURL, regexLabel);
}

async function consultLinks(matchMd, uri, regexURL, regexLabel) {
  let arrayN = [];
  matchMd.forEach((element) => {
    let links = element.match(regexURL);
    let urls = element.match(regexLabel);
    let newObjet = {
      href: links,
      label: urls,
      path: uri,
    };
    arrayN.push(newObjet);
  });
 
  let validateLinks = process.argv.indexOf("--validate");
  let statsLinks = process.argv.indexOf("--stats");

  if (validateLinks > 0 || statsLinks>0) {
    getInfoLink(arrayN,validateLinks, statsLinks);
    //validAndStatsLinks
  } else {
    //consultLinks(matchMd, uri, regexURL, regexLabel)
   return console.log(
      arrayN,
      "\nSe encontraron ",
      arrayN.length,
      " links en el archivo"
    );
     
  }
}

function getInfoLink(arrayN,validateLinks,statsLinks) {
  let arrayS = [];
  let arrFail = [];
  let links = arrayN.map((link) => {
    fetch(link.href)
      .then((res) => {
        let object = {
          href: res.url,
          label: link.label,
          status: res.status,
          statusText: res.statusText,
        };
        arrayS.push(object);
        if (validateLinks>0 || statsLinks>0){
          if(arrayN.length === arrayS.length+arrFail.length){
             validAndStatsLinks(arrayS,arrayN,arrFail,validateLinks,statsLinks)
          }
          
      }        
      })

      .catch((err) => {
        let objetFail = err.message;
        if (objetFail !== null) {
          //console.log("Error de conexión :", chalk.bgYellow(chalk.black(`${objetFail}`)));
        }
        arrFail.push(objetFail);

        
      });
      

    });
  
   

} 



function validAndStatsLinks(arrayS, arrayN, arrFail,validateLinks,statsLinks) {
  console.log(validateLinks)
  console.log(statsLinks)
  if(validateLinks>0 && statsLinks>0){
    console.log("estan los 2")
    let succes = 0;
  let broke =0;
  let fail = 0;
  const statusOk = (arrayS)=>{
    arrayS.filter((linkOK) => {
    if (linkOK.status===200){
      succes++;
      return console.log( `${linkOK.label}`,chalk.bgBlue(`✔ ${linkOK.statusText}`))
    }  
  });
}
  const statusNotFound = (arrayS)=>{
    arrayS.filter((linkFail) => {
    if(linkFail.status ===404){
      broke++;
      return console.log(`${linkFail.label}`, chalk.bgRed(`X ${linkFail.statusText}`));
    }
  });
}
/* 
   let noConnect = arrFail.filter((failed)=>{
    if(failed.reason === 'connect ECONNREFUSED 80.93.92.146:443'){
      fail++;
      return console.log("Error de conexión :", chalk.bgYellow(chalk.black(`${failed}`)));

    }
  })  */
  //console.log(arrFail)
  let total = arrayN.length;
  let totalNoConnect = arrFail.length;
 
  console.log(succes," ok");
  console.log(broke," fail");
  console.log(totalNoConnect,"error conect");
  console.log(total," totall");
  
  }
    else if(statsLinks>0){
      console.log("stadisticasss")
      console.log(succes," ok");
      console.log(broke," fail");
      console.log(totalNoConnect,"error conect");
      console.log(total," totall");
    
  }
  else if(validateLinks>0){
    console.log("validarrrr")
    statusOk()
    statusNotFound()
  }
  /* */
 
  
}



findFile();

mdLinks.findFile = findFile;
mdLinks.readFiles = readFiles;

module.exports = mdLinks;
