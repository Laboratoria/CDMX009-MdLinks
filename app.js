//let chalk = require('chalk')
//let inquire = require('inquire')
let md = new require("markdown-it")()
let fs = require("fs")
let index = process.argv.indexOf("--file")
if (index < 0) return console.log("Necesitas usar la flag --file con un uri válido")
let uri = process.argv[index + 1]
let string = fs.readFileSync(uri, "utf8")
console.log(process.argv)
console.log("index: ", index)
console.log("uri: ", uri)
console.log(string)
console.log(typeof(string))
    // 
    // let string = fs.readFileSync('./README.md', "utf8")
let result = md.parse(string)
console.log("result", result)

function getLinks(token) {

    return result.token.filter(result => result.token.includes(token))
}
console.log("links", getLinks(token))

//let resultRex = /[https]/