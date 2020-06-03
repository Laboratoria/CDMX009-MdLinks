
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
            console.log('archivo valido')
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


   const validateLinks = (links) =>{
      for(let i=0; i<links.length;i++){
        fetch(links[i])
        .then(res => {
          if(res.status == 200){
            console.log('link valido: ',links[i],res.status )
          }else{
           
            console.log('link invalido: ', links[i] ,res.status )
          }
        }).catch(e =>{
          console.log()
        })
      }
   } 