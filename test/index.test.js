const { readMd }  = require('../index');

describe('test de funcion 1', () => {
  test('espero que mi funcion 1 sea una funcion', () => {
    expect(typeof readMd).toBe('function')
  })
})
  it('Se espera leer un archivo de lectura',() => {
    let uri = './otraCosa.md'
  expect(typeof readMd(uri)).toBe('string')
})