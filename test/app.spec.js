const indexFile = require('../app');

describe('indexFile', () => {

    it('should be a function', () => {
        expect(typeof indexFile).toBe('function');
    });
});

/* describe('indexMd', () => {
    it('should be a function', () => {
        expect(typeof indexMd).toBe('function');
    });
    it('should return "README.md" for "./app.js --file README.md"', () => {
        expect(indexMd()).toBe('README.md');
    });
}); */
