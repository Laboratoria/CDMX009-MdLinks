
const read= require('../utils/readFile.js')
const findLinks= require('../utils/findLinks')
const linksFunctions= require('../utils/validateAndStatusLinks')

describe('function to read files', () => {
    it('should be a function', () => {
      expect(typeof read).toBe('function');
    });
    it ('should return a buffer object', async ()=>{
      let results= await read( 'C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/archivo.md');
      expect(typeof results).toBe('object');
    })
    
  });

describe('this function finds links that exisit inside of a file', () =>{
  it('should be a function', ()=>{
    expect(typeof findLinks).toBe('function');
  });
})

describe('shoul return alll the links', () => {
 
  test('find the links', async () => {
    let myArray= await findLinks('[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy comú encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).');
    expect(typeof myArray).toBe('object')
  });
  test('in this case the file wont have any links, thats why it couldn be an object', async () => {
    let myArray= await findLinks('Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy comú encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).');
    expect(myArray).toMatch('This file has no links')
});

});

describe('this functión calls other functions', () =>{
  it('should be a function', ()=>{
    expect(typeof linksFunctions.getStatusLink).toBe('function');
  });
  it('should return a message  when it has wrong the first option', async () =>{
    commandLine='--validat'
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
  //it('should return an object with the links status', async () =>{
  //  let val= await linksFunctions.validate('C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/someLnks.js');
  //    expect(typeof val).toBe('object')
   // })
  })

  describe('this function validate the links', () =>{
    it ('shold be a function', () =>{
      expect(typeof linksFunctions.stats).toBe('function')
    })
  })






  