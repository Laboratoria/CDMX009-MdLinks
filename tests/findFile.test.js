const { findFile } = require('../mocks/findFileTest');


describe('route detection function', () => {
    test('should result in the type of function',() => {
        expect(typeof findFile).toBe("function")
    })
    it ('should result in the route of readme', () => {
        expect(findFile()).toBe("README.md")
    })
})