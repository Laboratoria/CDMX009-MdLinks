let path = require('path');
let fs = require('fs');

let { validateFile, readFile, procesarFile, validateLinks, validarLink, } = require("../index");

describe('validarLink', () => {
  it('debería ser una función', () => {
    expect(typeof validarLink).toBe('function');
  });

  it('test file with .md extension', () => {
    let uri = 'links.md'
    let file = path.extname(uri)
    expect(file).toBe('.md')
  });

  it('test file different to .md extension', () => {
    let uri = 'links.js'
    let file = path.extname(uri)
    expect(file).toEqual(expect.not.stringMatching('.md'))
  });
})




