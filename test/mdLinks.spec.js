const { validatePath,
  readDir,
  choosePath,
  urlStatus,
  findUrl,
  validateUrl,
  getStats } = require('../utils/utils');


test('given a single file should be flag: singleFile', () =>{
  let path = '/home/laboratoria159-pm/CDMX009-MdLinks/README.md';
  expect(validatePath(path)).toBe('singleFile')
})

test('given a directory should be flag: directory', () =>{
  let path = '/home/laboratoria159-pm/CDMX009-MdLinks/';
  expect(validatePath(path)).toBe('directory')
})

test('read directory files', async () => {
  let readDirResponse= await readDir('/home/laboratoria159-pm/CDMX009-MdLinks/');
  expect(typeof readDirResponse).toBe('object')
})

test('Finds URLs in a markdown file', () => {
  let findUrlResponse=  findUrl('/home/laboratoria159-pm/CDMX009-MdLinks/file1.md');
  expect(typeof findUrlResponse).toBe('object')
})

test('Doesnt find URLs in a markdown file', () => {
  let findUrlResponse = findUrl('/home/laboratoria159-pm/CDMX009-MdLinks/nofile.md');
  expect(findUrlResponse).toBe(undefined)
})

test('URLs status in a markdown file', async () => {
  let urlStatusResponse= await urlStatus('/home/laboratoria159-pm/CDMX009-MdLinks/file1.md');
  let getStatsResponse= getStats(urlStatusResponse);
  expect(typeof urlStatusResponse).toBe('object')
  expect(getStatsResponse).toBe('2 1')
})

test('URLs status in a markdown file', async () => {
  let urlStatusResponse= await urlStatus('/home/laboratoria159-pm/CDMX009-MdLinks/file1.md');
  expect(urlStatusResponse[0].status).toBe('broken')
  expect(urlStatusResponse[1].status).toBe('ok')
  expect(urlStatusResponse[2].status).toBe('ok')
})

test('URLs status in a markdown file', async () => {
  let urlStatusResponse= await urlStatus('/home/laboratoria159-pm/CDMX009-MdLinks/file1.md');
  expect(urlStatusResponse[0].code).toBe(404)
  expect(urlStatusResponse[1].code).toBe(200)
  expect(urlStatusResponse[2].code).toBe(200)
})


/*
describe('prueba', ()=>{
  test('given a single file should be flag: singleFile', () =>{
    let path = '/home/laboratoria159-pm/CDMX009-MdLinks/README.md';
    expect(validatePath(path)).toBe('singleFile')
})*/


/*
test('read directory files', async () => {
  let readDirResponse= await readDir('/home/laboratoria159-pm/CDMX009-MdLinks/');
  let choosePathResponse= await choosePath( readDirResponse,'/home/laboratoria159-pm/CDMX009-MdLinks/');
  expect(typeof readDirResponse).toBe('object')
  expect(typeof choosePathResponse).toBe('string')
})*/

