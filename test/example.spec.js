const { mdLink} = require('../src/index.js');



describe('mdLink', () => {
  it('MdLink should be an object', () => {
    expect(typeof mdLink).toBe('object');
    console.log('is an object');  
  });
});
