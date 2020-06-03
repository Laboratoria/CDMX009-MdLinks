const validateLinks = require('../src/app');
const indexFile = require('../src/app');

 describe('validateLinks', () => {
    it('validateLinks should be a function', () => {
        expect(typeof validateLinks).toEqual('function')
    })
     it('should return an object with link status', () => {
        let links  = ['https://google.com', 'https://nodejs.org/'];
        let result = {
            url: 'https://google.com',
            status: '200',
            text: 'OK'
        }
        validateLinks(links)
        expect(typeof result).toBe('object')
    }) 
})  

 describe('indexFile', () => {
    it('indexFile should be a funcion', () => {
        expect(typeof indexFile).toEqual('function')
    })
     it('find directory', () => {
        let directory = process.cwd();
        expect(directory).toEqual('/home/laboratoria57-am/CDMX009-MdLinks/src')
    })
});
 /*    it ('should return test.md for --file test.md', () => {
        let flag = process.argv.indexOf('--file')
        let file = process.argv[flag + 1]
        expect(indexFile()).toEqual('test.md')
    }) */

/*     it('test file different to .md extension', () => {
        let uri = 'links.js'
        let file = path.extname(uri)
        expect(file).toEqual(expect.not.stringMatching('.md'))
    })  */
