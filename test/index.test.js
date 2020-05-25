const indexFunc = require('../index');

describe('readFile', () => {
    it('should be a function', () => {
        expect(typeof indexFunc.readFile).toBe('function');
    });
});

