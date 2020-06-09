const fs = require('fs');

let readFiles = (fileName) => {
    let string = fs.readFileSync(`${fileName}`, 'utf8');
    return string;
}
test('funcion readFiles', () => {
    let xel = readFiles("README.md");
    expect(typeof xel).toBe('string');
})

describe('getLinks should verify if the links match with the RegExp', () => {
    let newArr = ['https://deltice.github.io/jest/docs/es-ES/expect.html', 'https://yargs.js.org/docs/', 'https://zealdocs.org/download.html#linux']
    const regExp = [
        expect.stringMatching(/\bhttps?:\/\/\S+/gi),
    ];
    it('verifica si el link coincide con la regExp', () => {
        expect((newArr))
            .toEqual(expect.arrayContaining(regExp));
    });
});

describe('getLinks', () => {
    it('the result of getLinks should be a string', () => {
        let string = 'https://github.com/CDMX009-MdLinks/master/test/mdLinks.spec.js';
        expect(typeof (string)).toBe('string')
    })
})
