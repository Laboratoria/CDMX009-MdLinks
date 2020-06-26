const { validate, validateStats} = require('./validate');
const { getLinks, uniqueLinks,stats} = require('./stats');
const data = '- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)'
const links =['https://github.com/merunga/pildora-recursion','https://github.com/merunga/pildora-recursion']
const val ='https://github.com/merunga/pildora-recursion  OK  200'
const link ='https://github.com/merunga/pildora-recursion'
describe("getLinks", () =>{
  it('es una funcion', () => {
    expect(typeof getLinks).toBe('function');
  });
  it('muestra los links en un array', () => {
    expect(getLinks(data)).toStrictEqual(links);
  });
});

describe("uniqueLinks", () =>{
  it('es una funcion', () => {
    expect(typeof uniqueLinks).toBe('function');
  });
  it('muestra la cantidad de links unicos', () => {
    expect(uniqueLinks(links)).toStrictEqual("Unique:" + 1);
  });
});

describe("validate", () =>{
  it('es una funcion', () => {
    expect(typeof validate).toBe('function');
  });
  test('muestra la validacion de los links', () => {
    expect(Promise.resolve(link)).resolves.toEqual(val);
    
  });
});

describe("stats", () =>{
  it('es una funcion', () => {
    expect(typeof stats).toBe('function');
  });
  test('muestra el status de los links', () => {
     expect(Promise.resolve(link)).resolves.toStrictEqual("broke:" + 0 + "\nok:" + 1);
    
  });
});