let md = new require("markdown-it")()
let fs = require('fs')

let string = fs.readFileSync('./readme.md', "utf8")
let result = md.parseInline(string)
let links = result[0].children.filter(ch => (ch.tag === "a" && ch.attrs)).map(c => c.attrs[0][1])
console.log(links)