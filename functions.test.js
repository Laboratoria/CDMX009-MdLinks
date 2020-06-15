
let fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')


let response = {
    status: 200
}

const{getoString, Links, validateLinks} = require ('./index.js')

describe('validateLinks', () => {
    it ('Should return status 200 id is ok', () => {
        expect(response.status).toBe(200)
    })
})
console.log(getoString);

describe('getoString', () => {

    it('Should be a function', () => {
      expect(typeof getoString).toBe('function');
    });
  
  });

