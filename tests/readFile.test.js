const { file } = require('../mocks/readFileTest');

describe('read file with node.js', () => {
    test('that results in the data',() => {
        let readme= './README.md';
        return file(readme)
        .then( datos => expect(typeof(datos)).toBe('string') )
    })
})