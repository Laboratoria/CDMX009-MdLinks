const { validate } = require('../mocks/validateTest')

describe('validate links', () => {
    test('that results in array of objects', () => {
        let objects = [
            {
              url: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://es.wikipedia.org/wiki/Node.js',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://docs.npmjs.com/cli/install',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/api/path.html',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/markedjs/marked',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/markedjs/marked',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/workshopper/how-to-npm',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/markdown-it/markdown-it',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/cheeriojs/cheerio',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/jsdom/jsdom',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
              text: 'OK',
              status: 200,
              boolean: true
            },
            { url: 'https://nodejs.org', text: 'OK', status: 200, boolean: true },
            {
              url: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/es',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/docs/latest-v0.10.x',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/en',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://nodejs.org/es/about',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://docs.npmjs.com/getting-started/what-is-npm',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/stevekane/promise-it-wont-hurt',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://developers.google.com/v8',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/Laboratoria/course-parser',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/merunga/pildora-recursion',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://github.com/workshopper/learnyounode',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://javascript.info/promise-basics',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
              text: 'OK',
              status: 200,
              boolean: true
            },
            {
              url: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript',
              status: 'Error',
              text: 'request to https://carlosazaustre.com/manejando-la-asincronia-en-javascript failed, reason: connect ECONNREFUSED 80.93.92.146:443',
              boolean: false
            }
          ]
        expect(typeof validate(objects).toBe('string'))
    }) 
})