const { array } = require ('../mocks/showStatsOrValidateTest');

describe('link detection function', () => {
    test('should result in the object of links in number count', () => {
        let links = [
            'https://nodejs.org/en/',
            'https://nodejs.org/api/fs.html',
            'https://nodejs.org/api/http.html#http_http_get_options_callback',
            'https://daringfireball.net/projects/markdown/syntax'
        ]
        expect(typeof array(links)).toBe('object')
    })
})