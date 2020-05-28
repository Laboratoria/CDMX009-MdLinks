//const fs = require('fs')
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
  it('should return all the links', async () =>{
    let myArray= await findLinks('C:/Users/danyc/laboratoria/CDMX009-MdLinks/test/bufer.txt');
    expect(typeof myArray).toBe('object')
  })
})

describe('this functión calls other functions', () =>{
  it('should be a function', ()=>{
    expect(typeof linksFunctions.getStatusLink).toBe('function');
  });
 // it('should be true when it has the right arguments', async () =>{
 //   commandLine='node index.js  --file /c/Users/danyc/laboratoria/CDMX009-MdLinks/test/fileNoLinks.md --validate --stats'
 //   let goTo= await linksFunctions.getStatusLink('');
 //   expect(goTo).toBe(true)
 // })
})



  