const path = require('path');

module.exports = {
  entry: './main.ts',
  stats: {
    warnings: false
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      'readline': require.resolve('readline'),
      'buffer': require.resolve('buffer')
    }
  },
  externals: { 
    'readline': 'readline',
    'buffer': 'buffer'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
