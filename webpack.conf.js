var path = require('path');

module.exports = {
    entry: {
        app: ['./src_www/react.jsx'],
    },
    module: {loaders: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
            },
        },
        {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015'],
            },
        }
    ]},
    output: {
        path: path.resolve(__dirname, 'dist_www'),
        filename: 'bundle.js',
    },
};