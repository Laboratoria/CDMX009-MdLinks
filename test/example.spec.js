const {mdLink} = require('../src/index.js');
const fs = require("fs");
const pathFile = '../index.js';
const pathFiles = 'README1.md';
let data = fs.readFileSync(pathFiles, 'utf8')


describe('mdLink', () => {
  it('MdLink should be an object', () => {
    expect(typeof mdLink).toBe('object');
    console.log('is an object');  
  });
});
describe('validatePath', () => {
  it('should validate if path README1.md is a markdown file: true', () => {
    expect(mdLink.readAndValidMarkDown(pathFiles)).toBe(true);
    console.log('The path is true', pathFiles);
  })
  it('should validate if path index.js is a markdown file: false', () => {
    expect(mdLink.readAndValidMarkDown(pathFile)).toBe(false);
    console.log('The path is false', pathFile);
  });
});
describe('getLinks', () => {
  it('getLinks in file README1.md should return an array with 3 elements', () => {
    expect(mdLink.findLinks(data)).toHaveLength(3);
  });
});
