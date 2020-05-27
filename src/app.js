const fs = require('fs');
const path = require('path');
const glob = require('glob');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const BuscarArchivos = () =>{
//const dir = path.basename(__dirname);
//const md = path.extname(dir);  
let index = process.argv.indexOf("--file"); 
if(index<0) return console.log("Necesita utilizar la flag --file con el uri validod"); 
let uri = process.argv[index + 1]; 
let leerarchivo = fs.readFileSync(uri,"utf8"); 

console.log(process.argv); 
console.log("index; ", index);
console.log("uri; ", uri);  
//console.log("Texto en el archivo; ", leerarchivo);
//console.log(dir); 
//console.log(md); 
}

const getDirectories = (src) => new Promise((resolve, reject) => {
    glob(`${src}/**/*.md`, (err, files) => {
      if (err) {
        reject(err);
      }
       resolve(files);
      /*let archivos = `Bonbre de Archivos  ${files}  `;  
       console.log(archivos);*/
      //console.log('No. Url: '+ files);
     // let art  =  'No. Url: ' +  files; 
      DirGe(files);   
    });
  });
// (getDirectories('./test').then((files) => (files)));

 /* const dir = path.basename(__dirname);
  const isDirectory = (str) => {
    const dir = fs.readdirSync(str); // output -->> array con strings
    const listFiles = dir.filter((item) => path.extname(item) === '.md');
    //return (listFiles);
    console.log(listFiles); 
  };*/

  const DirGe = (filePath) =>{
   // Validar si se recibio un directorio o un archivo
	// TODO: Si existe otro directorio leerlo.
	//const filesArray = [];
	//const pathValidation = fs.statSync(filePath);
	/*if (pathValidation.isDirectory()) {
		// Si es directorio push al array de archivos a trabajar de todos los archivos con extension .md
		filesArray = fileExtractor(filePath, recursive);
	} else if (pathValidation.isFile() && path.extname(filePath) === '.md') {
		// Si es archivo push directo al array de archivos a trabajar
		filesArray.push(filePath);
	} else {
		throw new Error('File or directory invalid.');
	}
	if (filesArray.length === 0) {
		throw 'Empty directory.';
	}*/
	console.log(filePath);
  //console.log(filesArray); 
  }
  BuscarArchivos(); 
/*
   module.exports = {
    BuscarArchivos, DirGe
}*/

