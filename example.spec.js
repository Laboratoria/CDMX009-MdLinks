const mdLink = require ('index.js');

describe ('mdLink', () => { 
    it ('should be an object', () => { 
        expect (typeof mdLink).toBe('object');
    });

    describe('readMd', () => { 
        it ('should be a function', () => { 
            expect (typeof mdLink.readMd).toBe('function');
        });
    });
});