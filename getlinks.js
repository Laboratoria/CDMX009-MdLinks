//Funcion para obtener los links del README.md

let fs = require('fs');
let md = new require("markdown-it")();
let string = fs.readFileSync('./text.md', "utf8");
let result = md.parseInline(string);

let getlinks = result[0].children.filter(link => (link.tag === "a" && link.attrs)).map(link => link.attrs[0][1])
console.log(getlinks)

module.exports = { getlinks }















