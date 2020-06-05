const stats = require('./stats');

describe("stats", () =>{
  it('es una funcion', () => {
    expect(typeof stats ).toBe('function');
  });
  it('muestra carac de los links', () => {
    expect('- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)').toEqual('https://github.com/merunga/pildora-recursion  OK  200');
  });
});
