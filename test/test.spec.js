const mdLinks = require('../app.js');
const path = require('path');
const fs = require('fs')

describe('mdLinks',()=>{
	it('deberia ser un objeto', ()=>{
		expect(typeof mdLinks).toBe('object');
	})
})

describe('mdLinks.findFile',()=>{
	test('findFile deberia ser una funcion',()=>{
		expect(typeof mdLinks.findFile).toBe('function')
	})
	test ('index no debe ser 0', () =>{
		let index = process.argv.indexOf("--file");
		expect(mdLinks.findFile(index)).not.toBe(0)
	  })
	  test('la extension del archivo debe ser .md', () => {
        let uri = 'links.md'
        let file = path.extname(uri)
        expect(file).toBe('.md')
	})
	test('si no es .md no debe hacer match', () => {
        let uri = 'links.js'
        let fileExtension = path.extname(uri)
        expect(fileExtension).not.toMatch('.md')
    })
	 
	})
	

describe('mdLinks.readFile',()=>{
	it('readFile deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
	test('deberia leer un archivo',()=>{
		
		let uri = "test/fileTest.md"
		let fileContent = fs.readFileSync(uri, "utf-8");
		expect(typeof fileContent).toBe('string')
		//console.log(fileContent)
	})
})

describe('mdLinks.consultLinks',()=>{
	it('consult Links deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
	test("Deberia regrear las coincidencias de un link",()=>{
		let regexMarkdown = /\[(.+)\]\s(https?:.+?\S+)/gim;
		let uri = "test/fileTest.md"
		let fileContent = fs.readFileSync(uri, "utf-8");
		let deleteBrackets = fileContent.replace(/[\(\)]/gim, " ");
		let matchMd = deleteBrackets.match(regexMarkdown)
		expect(matchMd).toBe(`[
			{
			  href: [ 'https://es.wikipedia.org/wiki/Markdown' ],
			  label: [ '[Markdown] ' ],
			  path: 'C:\\Users\\hp\\Documents\\laboratoria\\CDMX009-MdLinks\\test\\fileTest.md'
			},
			{
			  href: [ 'https://nodejs.org/es/about/' ],
			  label: [ '[Acerca de Node.js - Documentación oficial] ' ],
			  path: 'C:\\Users\\hp\\Documents\\laboratoria\\CDMX009-MdLinks\\test\\fileTest.md'
			},
			{
			  href: [ 'https://nodejs.org/api/fs.html' ],
			  label: [ '[Node.js file system - Documentación oficial] ' ],
			  path: 'C:\\Users\\hp\\Documents\\laboratoria\\CDMX009-MdLinks\\test\\fileTest.md'
			},
			{
			  href: [
				'https://nodejs.org/api/http.html#http_http_get_options_callback'
			  ],
			  label: [ '[Node.js http.get - Documentación oficial] ' ],
			  path: 'C:\\Users\\hp\\Documents\\laboratoria\\CDMX009-MdLinks\\test\\fileTest.md'
			},
			{
			  href: [ 'https://es.wikipedia.org/wiki/Node.js' ],
			  label: [ '[Node.js - Wikipedia] ' ],
			  path: 'C:\\Users\\hp\\Documents\\laboratoria\\CDMX009-MdLinks\\test\\fileTest.md'
			}
		  ]
		  Se encontraron  5  links en el archivo`)
	})
})

describe('mdLinks.getLinks',()=>{
	it('getLinks deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
})

describe('mdLinks.getInfoLinks',()=>{
	it('getInfolinks deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
})
describe('mdLinks.newValidate',()=>{
	it('validate deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
})
describe('mdLinks.newStats',()=>{
	it('Stats deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
})

