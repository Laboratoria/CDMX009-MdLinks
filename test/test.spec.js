const mdLinks = require('../md.js');
const index = require('../index.js')


describe('mdLinks', () => {

  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Deberia devolver ', () => {
    expect(typeof mdLinks(README.md)).toEqual('array');
  });

});

describe('index', () => {

  it('Debería ser una funcion', () => {
    expect(typeof index).toBe('function');
  });

});