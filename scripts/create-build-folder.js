const fs = require('fs');

const sourcePath = './';
const destinationPath = './build/';

function clone() {
  const paths = ['dist', 'es', 'lib', 'locale', 'LICENSE', 'package.json', 'README.md'];
  try {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      fs.cpSync(sourcePath + path, destinationPath + path, { recursive: true });
    }
    console.log('Clone done');
  } catch (e) {
    console.error('Fail to clone', e);
  }
}

clone();
