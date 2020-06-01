const findFiles = require('../app');

describe('archivo md', () => {
    it('deberia leer un archivo md', () => {
        expect(typeof findFiles).toBe("string");
    })
})
