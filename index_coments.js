// --file  le llamamos: flag o bandera le sigue un uri valido readme.md por eso es más uno-->ya que tenemos ese uri usarlo para la lectura de archivo


// la app debe leer un archivo
function readFile() {
    let fs = require('fs'); //El fsmódulo proporciona una API para interactuar con el sistema de archivos de una manera muy similar a las funciones estándar POSIX.
    let index = process.argv.indexOf("--file"); // retorna el primer índice en el que se puede encontrar un elemento dado en el array, ó retorna -1 si el elemento no esta presente.
    if (index < 0) return console.log("no se encuentra el archivo");
    let uri = process.argv[index + 1];

    let fileContent = fs.readFileSync(uri, 'utf8'); //El método fs.readFileSync () es una interfaz de programación de aplicaciones incorporada del módulo fs que se utiliza para leer el archivo y devolver su contenido.
    //PARÁMETROS:--> RUTA:toma la ruta relativa del archivo de texto. La ruta puede ser de tipo URL. El archivo también puede ser un descriptor de archivo. Si ambos archivos están en la misma carpeta, simplemente entre comillas el nombre del archivo.
    console.log(process.argv);
    console.log("index: ", index);
    console.log("uri: ", uri);
    console.log("contenido del archivo: ", fileContent);

}

readFile();







// Portable Operating System Interfac POSIX
//El estándar POSIX define una interfase portable para aplicaciones basadas en el popular
// sistema operativo UNIX2
//     .El principal objetivo de este estándar es la portabilidad de las
// aplicaciones a nivel de código fuente, mediante la unificación de las diferentes versiones
// del UNIX