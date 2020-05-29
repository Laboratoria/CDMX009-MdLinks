const { findFile } = require('../mocks/findFileTest');

const mockFn = jest.fn();
const route = new mockFn();
const file = new mockFn();
const flag = new mockFn();
const md = new mockFn();

describe('route detection function', () => {
    test('should result in the type of function',() => {
        expect(typeof findFile).toBe("function")
    })
    it ('should result in the route of readme', () => {
        const path = [ "route", "file", "flag", "md" ]
        expect(findFile()).toBe("README.md")
    })
})