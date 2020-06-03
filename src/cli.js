const fs = require('fs');
const path = require('path')

let inquirer = require('inquirer');
inquirer
  .prompt({
   name: 'ruta',
   message: '¿Que archivo deseas leer',
       
  })
  .then(answers => {
      let ruta = answers.ruta;
    route(ruta)
   
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });

  const route = (rout) =>{
    let route = require('path').dirname(rout) 
    cobtenerArchivos(route)
  }

  const obtenerArchivos = (route) =>{
    fs.readdir(route, function (err, archivos) {
if (err) {
onError(err);
return;
}
console.log(archivos);
});
  } 
/*
  const readFile = (archivo) =>{
    fs.readFile(archivo, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(data)
    })
  }
 
*/