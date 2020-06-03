const getArgv = require('src/index.js');

test('obtiene el argv del directorio o archivo', () => {
  expect(getArgv).toBe(Object);
});
