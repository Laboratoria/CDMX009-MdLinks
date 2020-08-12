

const findLinks= require('../utils/findLinks')
const linksFunctions= require('../utils/validateAndStatusLinks')
const mdLinks= require('../index.js')

describe('shoul return alll the links', () => {
 
  test('find the links', async () => {
    let myArray= await findLinks('[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy comú encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).');
    expect(typeof myArray).toBe('object')
  })
 

});

describe('this functión calls other functions', () =>{
  it('should be a function', ()=>{
    expect(typeof linksFunctions.getStatusLink).toBe('function');
  });
  it('should return a message  when it has wrong the first option', async () =>{
    let commandLine='--validat'
    let goTo= await linksFunctions.getStatusLink('C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/someLnks.md', commandLine);
    expect(goTo).toMatch("please type a valid option");
  })
//  it('should return a message  when it has wrong the first option', () =>{
//    commandLine='--validate'
//    commandLine2='--sd'
//    let goTo= linksFunctions.getStatusLink('C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/someLnks.md', commandLine, commandLine2);
//    expect(goTo).toMatch("type a valid second option");
//})
})

describe('this function validate the links', () =>{
  it ('shold be a function', () =>{
    expect(typeof linksFunctions.validate).toBe('function')
  })

  })

  describe('this function validate the links', () =>{
    it ('shold be a function', () =>{
      expect(typeof linksFunctions.stats).toBe('function')
    })
  })



describe('this function is the controler, is the initial way', () =>{
  it ('shold be a function', () =>{
    expect(typeof mdLinks.allTheLinks).toBe('function')
  })
})

describe('this function read files ', () =>{
  it ('shold be a function', () =>{
    expect(typeof mdLinks.readFile).toBe('function')
  })
  it ('should return a message', () =>{
    let uri= 'C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/someLnks.js';
    let line1= '--s'
    let line2='--v'

    expect(mdLinks.readFile(uri, line1, line2)).toMatch('you need a file with .md extention o you missed the flag --file before your path :) ')
  })
})

describe('this function read a directory', () =>{
  it ('shold be a function', () =>{
    expect(typeof mdLinks.readDirectory).toBe('function')
  })
})


  