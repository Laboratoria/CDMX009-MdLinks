const { file } = require('../readFile');

describe('read file with node.js', () => {
    test('that results in the data',() => {
        let readme= './README.md';
        file(readme)
        .then( datos => expect(datos).toBe('string') )
    })
})