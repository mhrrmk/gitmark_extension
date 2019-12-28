const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    ui: './src/ui/ui.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

