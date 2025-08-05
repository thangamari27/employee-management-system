const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js', // your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv() // Load env vars into process.env
  ],
  // Optional: for compatibility
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
};
