const path = require( 'path' );

module.exports = {
    entry: path.join( __dirname, 'views/main.jsx' ),
    output: {
        path: path.join( __dirname, 'views/' ),
        filename: "main.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
