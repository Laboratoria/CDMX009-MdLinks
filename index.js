let fs = require('fs');

let index = process.argv.indexOf('--file')
let uri = process.argv[index + 1];
/* console.log(process.argv[3]); */

let string = fs.readFileSync(uri, 'utf-8');

console.log(process.argv);
console.log('index: ', index);
console.log('uri: ', uri);
console.log('Texto en el archivo: ', string);