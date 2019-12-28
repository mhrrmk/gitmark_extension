const path = require('path');

module.exports = {
  entry: {
    background: './background.js',
    ui: './ui.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

