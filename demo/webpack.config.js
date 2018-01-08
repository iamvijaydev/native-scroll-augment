const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    // filename: '[name].[chunkhash].js'
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/'),
    publicPath: '/build/'
  },
};
