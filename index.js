let fs = require('fs')
let index = process.argv.indexOf("--file")
let uri = process.argv[index+1]
//let string = fs.readFileSync(uri,'utf8')
//console.log(process.argv)
//console.log("index: ", index)
//console.log("uri: ", uri)
//console.log( "Lectura de archivo", string);
//read file
/*fs.readFile(uri, function(err, data){
  if (err){
    console.log(err);
  }
  console.log(data.toString());
  });*/

// read file
let string = fs.readFileSync(uri, 'utf-8')
//console.log(string);

// get links
let regEx = /https:\/\/([a-z./-])+([0-9./-a-z])+/gi
let arrayLinks = string.match(regEx);
console.log(arrayLinks);


// Check links
for
