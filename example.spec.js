const {mdLink} = require('../CDMX009-MdLinks/index.js');
const testFile = 'Test.md';


describe ('mdLink', () => { 
    it ('should be an object', () => { 
        expect (typeof mdLink).toBe('object');
    });
    describe('readMd', () => { 
        it ('should be a function', () => { 
            expect (typeof mdLink.readMd).toBe('function');
            console.log ('its a function!');
        });
    });
    describe('Test.md', () => { 
        it ('It should read a .md file', () => { 
            expect (mdLink.readMd (testFile)).toBe(true);
            console.log('Yay, its a .md file!');
        });
    });
}); 