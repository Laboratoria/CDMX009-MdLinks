const path = require('path');
const fs = require('fs');
let { fileRoute, searchLinks, verifyLinks, statsLinks } = require('../src/app.js')

describe('fileRoute', () => {
    test('fileRoute should be a funcion', () => {
        expect(typeof fileRoute).toBe('function')
    })

    test('test file with .md extension', () => {
        let uri = 'links.md'
        let file = path.extname(uri)
        expect(file).toBe('.md')
    })

    test('test file different to .md extension', () => {
        let uri = 'links.js'
        let fileExtension = path.extname(uri)
        expect(fileExtension).toEqual(expect.not.stringMatching('.md'))
    })
})


describe('searchLinks', () => {

    test('searchLinks should be a funcion', () => {
        expect(typeof searchLinks).toBe('function')
    })
    test('searchLinks turns file to string, and should return an object with links ', () => {
        let object = {
            links: ['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/es/', 'https://www.npmjs.com/', "http://this-should-not-work.local/oh/my/god",
                "https://www.appleasadfffd.com/mx/"],
            path: 'src/links.md'
        }
        let uri = 'src/links.md'
        let turnString = fs.readFileSync(uri, 'utf-8')
        expect(typeof turnString).toEqual('string')
        expect(searchLinks(uri)).toEqual(object)
    })


})

describe('verifyLinks', () => {

    test('verifyLinks should be a function', () => {
        expect(typeof verifyLinks).toBe('function')
    })

    test('should turns an objects with status links', () => {
        let mockLink = ['https://es.wikipedia.org/wiki/Markdown', 'https://nodejs.org/es/']
        let result = [{
            href: 'https://es.wikipedia.org/wiki/Markdown',
            status: '200 ok',

        },
        {
            href: 'https://nodejs.org/es/',
            status: '200 ok',

        },

        ]
        return verifyLinks(mockLink).then(res => {
            expect(typeof res).toBe('object')
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

    test('should be a function', () => {
        expect(typeof statsLinks).toBe('function')
    })
    test('should turns validate statistics', () => {
        expect(statsLinks(resVal, total, arrLinks)).toEqual(stats)
    })

})