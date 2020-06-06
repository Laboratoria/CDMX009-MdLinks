const {
  absolutePath, walkDir, getLinks,
} = require('../src/mdlink.js');

describe('Funtion AbsolutePath', () => {
  it('is a function', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('Return absolute path', () => {
    const output = 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js'; 
    expect(absolutePath('./src/mdlink.js')).toBe(output);
  });
  it('It should return a string with the current entry', () => {
    const output = 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js';
    expect(absolutePath('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js')).toBe(output);
  });
});

// assets prueba una funcion usada para extraer rutas dentro de dir y subdir//
describe('walkDir ', () => {
  it('is a function', () => {
    expect(typeof walkDir).toBe('function');
  });
  it('Should return an array of strings', () => {
    const filesOutput = [
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\final.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\mdlinks.spec.js',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\out.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\read.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\assets-API\\other.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\assets-API\\out.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\assets-API\\prueba.js',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\assets-API\\assets.md'];
    expect(walkDir('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets')).toEqual(filesOutput);
  });
});


// assets funcion extraer links //

describe('getLinks', () => {
  it('is a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('It should return an array of objects, each with 3 propertie', () => {
    const linksOutput = [{
        href: 'https://docs.npmjs.com/getting-started/what-is-npm',
        text: 'NPM',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\final.md'
      },
      {
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        text: 'Publicar packpage',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\final.md'
      },
      {
        href: 'https://javascript.info/promise-basics',
        text: 'Promise',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\final.md'
      }]
    expect(getLinks('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\assets\\final.md')).toEqual(linksOutput);
  });
});
