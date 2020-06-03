const { validateArgvExist, validateExt, readFiles, selectOption, getLinks, validateLinks, stats } = require('../app')

describe('validateArgvExist', () => {
    it('should be a function', () => {
        expect(typeof validateArgvExist()).toBe('function');
    });
});

