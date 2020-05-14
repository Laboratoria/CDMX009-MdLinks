const indexMd = require('../app');

describe('indexMd', () => {

    it('should be a function', () => {
        expect(typeof indexMd).toBe('function');
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
