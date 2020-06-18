const fs = require('fs');
const expect = require('expect');

const { readFile, showLinks, isMarkDown, checkLinkStatus, arrayCount } = require('./app.js');

let path = './README.md'
let badPath = './app.js'

describe('readFile', () => {
    it('Should Get all links of the file', () => {
        expect(readFile()).toBe(undefined);
    });
});

describe('readFile', () => {
    it('Should be a function', () => {
        expect(typeof readFile).toBe('function');
    });
});

describe('isMarkDown', () => {
    it('Should return false if it is not an .md file', () => {
        expect(isMarkDown(badPath)).toBe(false);
    });
});

describe('isMarkDown', () => {
    it('Should return true if it is an .md file', () => {
        expect(isMarkDown(path)).toBe(true);
    });
});
describe('checkLinkStatus', () => {
    it('Should retur err if links are not found in the file', () => {
        expect(() => checkLinkStatus()).toThrow(Error);
    });
});

describe('arrayCount', () => {
    it('Should retur err if links are not found in the file', () => {
        expect(() => arrayCount()).toThrow(Error);
    });
});

describe('showLinks', () => {
    it('Should return an array with the links that the file content ', () => {
        expect(() => showLinks()).toThrow(Error);
    });
});