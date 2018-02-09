const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/native-scroll-augment/dist/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader' }
        ]
      }
    ]
  }
};
