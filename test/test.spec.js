const mdLinks = require('../app.js');

describe('mdLinks',()=>{
	it('deberia ser un objeto', ()=>{
		expect(typeof mdLinks).toBe('object');
	})
})

describe('mdLinks.findFile',()=>{
	it('findFile deberia ser una funcion',()=>{
		expect(typeof mdLinks.findFile).toBe('function')
	})
	
})

describe('mdLinks.readFile',()=>{
	it('readFile deberia ser una funcion',()=>{
		expect(typeof mdLinks.readFiles).toBe('function')
	})
})