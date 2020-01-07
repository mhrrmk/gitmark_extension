const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../watch/backend'),
  },
  mode: 'production',
  watch: true
};