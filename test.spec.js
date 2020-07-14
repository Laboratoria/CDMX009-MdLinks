
const fs = require('fs');
const expect = require('expect');
const { readFile, confirmMdFile, getLinks, integrationCLI } = require('./src/app.js');
const { validateLinks, validateStats, linkStats } = require('./src/main.js');

let content = fs.readFileSync('./files/links.md', 'utf8');
let path = './text1.md'
let badPath = './app.js'


describe('readFile', () => {
	it('Should Get all links of the file', () => {
		let functionReadFile = readFile('README.md');
		expect(typeof functionReadFile).toBe('string');
	});
});

describe('confirmMdFile', () =>{
	it('Should return false if it is not an .md file', () => {
		expect(confirmMdFile(badPath)).toBe(false);
	});
});

describe('confirmMdFile', () =>{
	it('Should return true if it is an .md file', () => {
		expect(confirmMdFile(path)).toBe(false);
	});
});

describe('getLinks', () => {
	it('Should return an array with the links that the file content ', () =>{
		expect(getLinks(content, path)).toHaveLength(7);
	});
});

describe('integrationCLI', () => {
	it('Should return the file does not contain links ', () =>{
		expect(integrationCLI()).toBe(undefined);
	});
}); 

describe('validateLinks', () => {
	it('Should be a function', () => {
		expect(typeof validateLinks).toEqual('function');
	});
});

describe('validateLinks', () => {
	it('Should retur FAIL for status === 404', () => {
		expect(() => validateLinks()).toThrow(Error)
	});
});

describe('validateLinks', () => {
	it('Should retur err if the link is not found in the file', () => {
		expect(() => validateLinks()).toThrow(Error)
	});
});

describe('validateStats', () => {
	it('Should retunr result like a string', () => {
		let functionReadFile = readFile('README.md');
		expect(typeof functionReadFile).toBe('string');
	});
});

describe('validateStats', () => {
	it('Should retunr an object with the number of links', () => {
		let result = {
			uri: 'https://google.com',
			text: 'OK',
		};
		expect(typeof result).toBe('object');
	});
});

describe('linkStats', () => {
	it('Should be a function', () => {
		expect(typeof linkStats).toEqual('function');
	});
});

describe('linkStats', () => {
	it('Should retur an object', () => {
		let result = {};
		expect(typeof result).toBe('object');
	});
});







