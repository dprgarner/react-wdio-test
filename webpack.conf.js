var path = require('path');

module.exports = {
    entry: {
        app: ['./src/react.jsx'],
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
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
};