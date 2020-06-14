const { showLinks } = require ('../mocks/showLinksTests');

describe('detect links from markdown file', () => {
    test('that results in the links', () => {
        let markdown = '../mocks/showLinks.md';
        expect(typeof showLinks(markdown)).toBe('string')
    } )
})