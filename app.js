const fs = require('fs');
const path = require('path');

const getMDFiles = (uri) => {
    const file = path.extname(uri);
    if (file != '.md') {
        console.log('Invalid file type');
        return false;
    }
    else {
        return true;
    }
};

export default getMDFiles;