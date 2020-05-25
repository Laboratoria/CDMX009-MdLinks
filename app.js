const Link = require('./Link');
const fs = require('fs');
const path = require ('path');

const regex = RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

function mdLinks(rutaFile, validate) {
   return new Promise((resolve, reject) => {
      
      try {
         let cadena = fs.readFileSync(rutaFile,'utf8')
         let lineas = cadena.split('\n');
         
         // let includeLineHTTP = lineas.filter( linea => linea.includes("</a>"))
         let includeLineHTTP = lineas.filter( linea => regex.test(linea))
         
         let arrayLinks = [];

         includeLineHTTP.forEach((renglon) => {
            // let startLink = renglon.indexOf("\"")+1;
            // let endLink = renglon.indexOf("\"",startLink);
            let link =   renglon.match(regex)[0].replace(")","").replace(",", "");
            let text = ""
            
            if(renglon.indexOf("[") > 0 && renglon.indexOf("]") > 0){
               let startText = renglon.indexOf("[")+1;
               let endText = renglon.indexOf("]",startText);
               text =   renglon.substring(startText,endText);
            }
            
            arrayLinks.push(new Link(link,text,rutaFile))
         })

         return resolve(arrayLinks);

      } catch(error) {
         return reject("No se pudo completar la operacion. ");
      }
   })
}

mdLinks("C:\\Users\\Jhoel H\\Desktop\\GabyAlva\\CDMX009-MdLinks\\README.md",false)
   .then(data => {
      data.forEach((link)=>{
         console.log("href: " + link.href);
         console.log("text: " + link.text);
         console.log("file: " + link.file);
         console.log("*************************");
      })
   })
   .catch(error => console.log(error))

/*ejemplo
let files= fs.readdirSync('./');
fs.readdir('./'), (error, files) => {
   if(error){
      throw error;
   }
   console.log(files);

   //let archivo= fs.readFileSync('./readme.md', 'UTF-8');

   fs.readFile('./README.md', 'UTF-8', (error, archivo) => {
      if(error){
         throw error;
      }
      console.log(archivo);
   });
   console.log('contenido del archivo');
}*/

