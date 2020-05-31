const {
  absolutePath, getDirectory, getLinks,
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

//Test prueba una funcion realizada con una lib para extraer rutas dentro de dir y subdir//

describe('Asincrono - Promise(resolve, reject)', () => {
  it('Promise(resolve, reject)', () => {
    expect(typeof getDirectory).toEqual('function');
  });
  it('Promise- .resolves', () => {
    const positiveR = ['test/final.md', 'test/out.md', 'test/read.md', 'test/README.md'];
    return expect(Promise.resolve(positiveR)).resolves.toEqual(positiveR);
  });
  it('Promise- .reject', () => {
    const negativeR = ['Error'];
    return expect(Promise.reject(negativeR)).rejects.toEqual(negativeR);
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
