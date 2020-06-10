let fs = require('fs');
const { readFile, getLinks } = require('../app.js');

describe('readfile', () => {
    it('soy una función', () => {
        expect(typeof readFile).toBe('function');
    })
})

describe('readFile', () => {
    it('deberia leer un archivo', () => {
        let uri = "test/README.md"
        let fileContent = fs.readFileSync(uri, "utf-8");
        expect(typeof fileContent).toBe('string')
    })
})

