
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './build');

const _src = p => path.join(SOURCE_DIR, p);
const _example = name => _src(`${name}.example.js`);

module.exports = {
    mode: 'production',
    entry: {
        example: _example('vanilla'),
    },
    output: {
        filename: 'example.js',
        path: BUILD_DIR,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'babel-loader' }
            }
        ],
    },
};
