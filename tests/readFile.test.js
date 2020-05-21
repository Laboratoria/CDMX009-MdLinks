const { readFile } = require('../readFile');

describe('read file with node.js', () => {
    test('that results in the data',() => {
        let readme= './mocks/readFile.md';
        readFile(readme)
        .then( datos => expect(datos).toBe('string') )
    })
})