const path = require('path');
const {mdlink} = require('../app');

const testdir = path.join(__dirname, './testdir');
const mdfile = path.join(__dirname, './test.md');
const wrongfile = './wrongfile.txt';
const validURL = 'https://www.example.com/index.html';
const invalidURL = 'https://www.thiscantwork.es';


describe.only('isDirectory', () => {
  // leer un archivo de mi sistema
  it('return true if path is dir', () => {
    expect(mdlink.isDirectory(testdir)).toBe(true);
  });
  it('return false if path is file', () => {
    expect(mdlink.isDirectory(mdfile)).toBe(false);
  });
});

describe.only('isFile', () => {
  // leer un archivo de mi sistema
  it('return true if file exists', () => {
    expect(mdlink.isFile(mdfile)).toBe(true);
  });
  it('return true if file exists', () => {
    expect(mdlink.isFile(testdir)).toBe(false);
  });
});

describe.only('walkTree', () => {
  it('find files in a directory', () => {
    expect(mdlink.walkTree(testdir)).toEqual([ 'innertest.md', 'nonmdfile.js', 'nonmdfile.txt' ]);
  })
})

describe('getFile', () => {
  // leer un archivo de mi sistema
  it('should return a file', () => {
    expect(mdlink.getFile(testdir)).toBe('./test/testdir/innertest.md');
  });
});

describe.only('isMarkDown', () => {
//asegurarme de que sea un archivo markdown
  it('should return md file or false for any other file', () => {
    expect(mdlink.isMarkDown(mdfile)).toBe(mdfile);
    //expect(mdlink.isMarkDown(wrongfile)).toBe(false);
  });
});

describe('getLinks', () => {
//encontrar los links dentro del archivo
  it('should return: Example - https://www.example.com/index.html', () => {
    expect(mdlink.getLinks(mdfile)).toBe('Example -  https://www.example.com/index.html');
  });
});

describe('linkStatus', () => {
//probar o validar los links para saber su status
  it('should show link status as valid or broken', () => {
    expect(mdlink.linkStatus(validURL)).toBe('Working (200)');
    expect(mdlink.linkStatus(invalidURL)).toBe('Broken (400)');
  });
});

