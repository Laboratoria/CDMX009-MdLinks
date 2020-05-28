# Markdown Links

## Documentación técnica
Librería "basada en Node.js" cuyo objetivo es extraer los links de archivos formato Marckdown, sus funciones son: encontrar los links, validar su status y visualizar estádisticas respecto al total de links encontrados, links únicos (no se repiten) y total de links inválidos.
 
## Instalación


## JavaScript API
El módulo puede importarse en otros scripts de Node.js de la siguiente manera:

```js
const mdLinks = require('lizethrivera-md-links');

//Se
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
```


## CLI
Ejecución a través de la terminal:

`md-links <path-to-file> [options]`

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ 
./some/example.md https://otra-cosa.net/algun-doc.html
./some/example.md http://google.com/
```
#### Options

##### `--validate`

Muestra los links validados con su status

```sh13d99df067c1
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ work 200 
./some/example.md https://otra-cosa.net/algun-doc.html is broken
./some/example.md http://google.com/ work 200
```


##### `--stats`

Muestra estadísticas de los links únicos y totales

```sh
$ md-links ./some/example.md --stats
Basic statistics:
Total: 3
Unique: 3
```


##### `--validte --stats`
Muestra estadísticas de links únicos, totales e inválidos

```sh
$ md-links ./some/example.md --stats --validate
Validation statistics:
Total: 3
Unique: 3
Broken: 1
```


##### `--help`
Muestra una pequeña guía en caso de no estar seguro que CLI usar

```sh
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
y links "rotos"
```

## Flowchart
![Flowchart-Md-links](https://github.com/LizethRivera04/CDMX009-MdLinks/blob/master/src/Flowchart%20Md-links.jpg)

