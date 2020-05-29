const readMdFile = require('../index.js');

describe('readMdfile', () => {
    it('soy una función', () => {
        expect(typeof readMdFile).toBe('function');
    })
})