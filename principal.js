const main = require("./app.js")

main.mdLinks("C:\\Users\\Jhoel H\\Desktop\\laboratoria\\CDMX009-MdLinks\\README.md",true)
.then(data => console.log(data))
.catch(error => console.log(error))