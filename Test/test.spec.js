const {getFile,
    readFile,
    searchLinks,
    validateLinks,
    stats,
    validateAndStats} = require('../index.js');

test('Recibe uri', () => {
    let uri = true;
  expect(getFile(uri)).toBe('false');
});

test('Lee el archivo ingresado', () =>{
  
})