let { getPath, detectLinks, validateLinks, statsLinks } = require('../src/app.js')

describe('getPath', () => {
    it('getPath should be a funcion', () => {
        expect(typeof getPath).toEqual('function')
    })
    it('test file with .md extension', () => {
        let uri = 'links.md'
        let file = path.extname(uri)
        expect(file).toEqual('.md')
    })
    it('test file different to .md extension', () => {
        let uri = 'links.js'
        let file = path.extname(uri)
        expect(file).toEqual(expect.not.stringMatching('.md'))
    })
});


describe('detectLinks', () => {
    it('detectLinks should be a funcion', () => {
        expect(typeof detectLinks).toEqual('function')
    })
    it('detectLinks turns file to string, and should return an object with links ', () => {
        let object = {
            links: ['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/es/', 'https://www.npmjs.com/',
                "https://www.appleasadfffd.com/mx/"],
            path: 'src/links.md'
        }
        let uri = 'src/links.md'
        let turnString = fs.readFileSync(uri, 'utf-8')
        expect(typeof turnString).toEqual('string')
        expect(searchLinks(uri)).toEqual(object)
    })
});

describe('validateLinks', () => {
    it('validateLinks should be a function', () => {
        expect(typeof validateLinks).toEqual('function')
    })
    it('should turns an objects with status links', () => {
        let mockLink = ['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/es/']
        let result = [{
            href: 'https://es.wikipedia.org/wiki/Markdown',
            status: '200 ok',
            file: 'src/file.md'
        }],
        return validateLinks(mockLink).then(res => {
            expect(typeof res).toEqual('object')
        })
    })
})


describe('statsLinks', () => {
    let resVal = {
        message: 'src/links.md http://this-should-not-work.local/oh/my/god is broken',
        working: 'is broken'
    }
    let total = 1
    let arrLinks = ['https://es.wikipedia.org/wiki/Markdown']
    let stats = { Total: 1, Unique: 1, Broken: 1 }

    it('should be a function', () => {
        expect(typeof statsLinks).toEqual('function')
    })
    it('should turns validate statistics', () => {
        expect(statsLinks(resVal, total, arrLinks)).toEqual(stats)
    })
})
