
const fs = require('fs')
const { getLinks, getUri } = require("./src/app.js")


let content = fs.readFileSync('./test/example1.md', 'utf8')
let path = './test/example1.md'
let wrongPath = './app.js'

describe('Array of links', () => {
	it('Should create an array from the contents of the file ', () =>{
		expect(getLinks(content, path)).toHaveLength(3);
	})
})

describe('readFile', () =>{
	it('Should return false if its not an .md file', () =>{
		expect(getUri(wrongPath)).toBe(false)
	})
})





