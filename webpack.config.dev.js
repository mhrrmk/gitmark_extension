const path = require('path');

module.exports = {
  entry: {
    background: './src/backend/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev/backend'),
  },
};

