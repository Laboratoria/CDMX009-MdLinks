const { validatePath, readDir, choosePath } = require('../src/cli');
const { urlStatus, findUrl, validateUrl, stats } = require('../src/mdLinks');

test('given a single file should be flag: singleFile', () =>{
  let path = '/home/laboratoria159-pm/CDMX009-MdLinks/README.md';
  expect(validatePath(path)).toBe('singleFile')
})

test('given a directory should be flag: directory', () =>{
  let path = '/home/laboratoria159-pm/CDMX009-MdLinks/';
  expect(validatePath(path)).toBe('directory')
})




/*
test('should return a function', ()=>{
  expect(typeof urlStatus).toBe('function')
})

test('should return a function', ()=>{
  expect(typeof validatePath).toBe('function')
})*/



/*
describe('urlStatus', () => {

    it('should be a function', () => {
      expect(typeof urlStatus).toBe('function');
    });
)}*/   