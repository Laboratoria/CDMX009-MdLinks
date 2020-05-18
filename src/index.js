
const path = require('path');
const fs = require('fs');

function getArgv(){
let index = process.argv.indexOf("--file");
if(index < 0) return console.log("Necesitas usar la flag --file")
let ruta = process.argv[index +1];
 console.log(ruta)
validateMd(ruta)
}
function validateMd(ruta){
    if(path.extname(ruta) === '.md')
    console.log('valido')
    else console.log('invalid')
    link(ruta);
}
function link(ruta){
let archivo = fs.readFileSync(ruta, 'utf-8');
console.log('Esto se muestra después de haber leído el achivo2.txt (por el readFileSync)');

}


getArgv();
