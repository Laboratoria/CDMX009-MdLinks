const { validateArgvExist, validateExt, readFiles, selectOption, getLinks, validateLinks, stats } = require('../app')

describe('validateArgvExist', () => {
    it('should be a function', () => {
        expect(typeof validateArgvExist).toBe('function');
    });
    it('validateArgvExist should return the function validateExt when have a parameter', async() => {
        let inputFile = 'readme.md';
        let result = await validateArgvExist(inputFile);
        expect(result).toBe(validateExt(inputFile));
    });
    it('should return error message when argv was not entered', async() => {
        let result = await validateArgvExist();
        expect(result).toBe(console.log('You need to enter a correct filename to continue'));
    })
});
describe('validateExt', () => {
    it('should be a function', () => {
        expect(typeof validateExt).toBe('function');
    });
    it('should return readFiles function when the extension is md', async() => {
        let testFile = 'prueba.md';
        let result = await validateExt(testFile);
        expect(result).toBe(readFiles(testFile))
    })
});
describe('selectOption', () => {
    it('should be a function', () => {
        expect(typeof selectOption).toBe('function');
    })
})


