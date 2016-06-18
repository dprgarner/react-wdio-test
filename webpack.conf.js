var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
};