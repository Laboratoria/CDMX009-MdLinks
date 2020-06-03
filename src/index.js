
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');



const inquirer = require('inquirer');
inquirer
  .prompt({
   name: 'archivo',
   message: '¿Que archivo deseas leer',
       
  })
  .then(answers => {
      let archivo = answers.archivo;
     console.log(archivo)
     validateMd(archivo)
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

     const validateMd= (ruta)=>{
        if(path.extname(ruta) === '.md'){
            console.log('valido')
            readFile(ruta)
        }else{
            console.log('invalido ingresa un archivo de extensión .md')
        }
    }
    const readFile = (archivo) =>{
      fs.readFile(archivo, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }else{
          mark(data)
        }
       
      })
    }

   const mark = (path) =>{
    let regEx = (/https?:\S+\w/g);
    let links = path.match(regEx)
      validateLinks(links)
   }

   let linkValid = 0;
   let linkInvalid = 0;
   const validateLinks = (links) =>{
      for(let i=0; i<links.length;i++){
        fetch(links[i])
        .then(res => {
          if(res.status == 200){
              linkValid +=1;
          }else{
              linkInvalid +=1;
          }
          console.log('links validos: ', linkValid)
          console.log('links invalidos: ', linkInvalid)
        })
      }
   } 