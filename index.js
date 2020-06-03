
const fetch = require('node-fetch');
const Link = require('./Link');
const fs = require('fs');
const path = require('path');

const validateLinks = async function (links) {

    let size = links.length
    let index = 0;
    let validos = 0;
    let invalidos = 0; 

    while(index < size) {
      process.stdout.write(".");
       let result = await validarLink(links[index])
       links[index].isValid = result;
       
       (result == true) ? validos++ : invalidos ++;

       index ++;
    }
 
    return {
            links,
            validos,
            invalidos,
            "total":links.length
            }
 }
//Verificar que sea un archivo .md
 const validateFile = (pathFile) => {
   //  console.log("path: " + pathFile)
   let routeFile = path.extname(pathFile);
   if (routeFile !== '.md') {
      throw "Verificar que el archivo ingresado cumpla con la extención .md o ingresa una ruta correcta";
   }
 }
 
 const readFile = async function(routeFile) {
      validateFile(routeFile)
      let cadena = await fs.readFileSync(routeFile,'utf8')
      return cadena;
 }

 const procesarFile = function (cadena,routeFile) {
    const regex = RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

    let lineas = cadena.split('\n');
    
    let includeLineHTTP = lineas.filter( linea => regex.test(linea))
    
    let arrayLinks = [];

    includeLineHTTP.forEach(async (renglon) => {
       let link =   renglon.match(regex)[0].replace(")","").replace(",", "");
       let text = ""
       
       if(renglon.indexOf("[") > 0 && renglon.indexOf("]") > 0){
          let startText = renglon.indexOf("[")+1;
          let endText = renglon.indexOf("]",startText);
          text =   renglon.substring(startText,endText);
       }
        
       arrayLinks.push(new Link(link,text,routeFile))
    })

    return arrayLinks;
 }

 async function validarLink(link) {
    let isValid = false;
  
    try {
       let response = await fetch(link);
 
       if(response.status == 200){
          isValid = true
       }
    }catch(error) {
    //    console.log("Error en la peticion")
    }
 
    return isValid;
 }

 module.exports = {
   validateFile,
   readFile,
   procesarFile,
   validateLinks,
   validarLink,
 }
 