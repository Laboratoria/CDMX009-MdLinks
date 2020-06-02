const {
  absolutePath, walkDir, getLinks,
} = require('../src/mdlink.js');

describe('Funtion AbsolutePath', () => {
  it('is a function', () => {
    expect(typeof absolutePath).toBe('function');
  });
  it('Deberia retornar un string con la ruta absoluta', () => {
    const output = 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js'; 
    expect(absolutePath('./src/mdlink.js')).toBe(output);
  });
  it('Deberia retornar un string con la entrada actual', () => {
    const output = 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js';
    expect(absolutePath('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\src\\mdlink.js')).toBe(output);
  });
});

// Test prueba una funcion usada para extraer rutas dentro de dir y subdir//
describe('walkDir ', () => {
  it('is a function', () => {
    expect(typeof walkDir).toBe('function');
  });
  it('Deberia retornar un array de strings', () => {
    const filesOutput = [
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\mdlinks.spec.js',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\out.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\read.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\test-API\\other.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\test-API\\out.md',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\test-API\\prueba.js',
      'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\test-API\\test.md'];
    expect(walkDir('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test')).toEqual(filesOutput);
  });
});


// Test funcion extraer links //

describe('getLinks', () => {
  it('is a function', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('Deberia retornar un array de objetos, cada uno con 3 propiedades', () => {
    const linksOutput = [{
        href: 'https://docs.npmjs.com/getting-started/what-is-npm',
        text: 'NPM',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md'
      },
      {
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        text: 'Publicar packpage',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md'
      },
      {
        href: 'https://javascript.info/promise-basics',
        text: 'Promise',
        file: 'C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md'
      }]
    expect(getLinks('C:\\Users\\eliza\\Documents\\MdLinks\\CDMX009-MdLinks\\test\\final.md')).toEqual(linksOutput);
  });
});
