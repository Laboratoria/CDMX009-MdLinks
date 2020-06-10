
const fs = require('fs');
const expect = require('expect');
const { readFile, getLinks, getUri } = require('./src/app.js');
const { validateLinks } = require('./src/main.js');

let content = fs.readFileSync('./files/links.md', 'utf8');
let path = './files/links.md'
let badPath = './app.js'

describe('readFile', () => {
	it('Should be a function', () => {
		expect(typeof readFile).toBe('function');
	});
});

describe('readFile', () =>{
	it('Should return false if it is not an .md file', () => {
		expect(getUri(badPath)).toBe(false)
	});
});

describe('getLinks', () => {
	it('Should return an array with the links that the file content ', () =>{
		expect(getLinks(content, path)).toHaveLength(7);
	});
});

describe('validateLinks', () => {
	it('Should return an status 200 if the link is OK', () => {
		expect(result.status).toBe(200);
	});
});