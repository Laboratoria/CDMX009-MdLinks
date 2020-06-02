# Markdown Links

Librería basada en Node.js cuyo objetivo es extraer los links de archivos formato Markdown, sus funciones son: encontrar los links, validar su status y visualizar estádisticas respecto al total de links encontrados, links únicos y total de links inválidos.

Instalación
$ npm i verobega/md-links

JavaScript API
El módulo puede importarse en otros scripts de Node.js de la siguiente manera:

const mdLinks = require('verobega/md-links');


mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
CLI
Ejecución a través de la terminal:

md-links <path-to-file> [options]

$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ 
./some/example.md https://otra-cosa.net/algun-doc.html
./some/example.md http://google.com/

Options

--validate
Muestra los links validados con su estatus

$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ work 200 
./some/example.md https://otra-cosa.net/algun-doc.html It is not working
./some/example.md http://google.com/ work 200

--stats
Muestra estadísticas de los links únicos y totales

$ md-links ./some/example.md --stats
Basic statistics:
Total: 6
Unique: 6

--validte --stats
Muestra estadísticas de links únicos, totales e inválidos

$ md-links ./some/example.md --stats --validate
Validation statistics:
Total: 10
Unique: 7
Broken: 3

--help
Muestra una guía en caso de no estar seguro que CLI usar

$ md-links --help

Instrucciones :  
 md-links --help : recibe ayuda 
 md-links <path> ó 
 md-links <path> <options> 
 <path> : ruta del archivo o directorio 
 <options> : 
 --validate o --val : regresa ruta de archivo,link evaluado, status de link ; 
 --stats o --s : regresa la cantidad de links encontrados y links únicos; 
 --validate --stats : regresa regresa la cantidad de links encontrados, links únicos
y links "rotos".


<img src="images/Captura de Pantalla 2020-06-02 a la(s) 12.36.10.png">
