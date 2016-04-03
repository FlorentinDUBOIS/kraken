const path = require( 'path' );

module.exports = {
    entry: path.join( __dirname, 'libs/react/sources/main.jsx' ),
    output: {
        path: path.join( __dirname, 'libs/react/compiled' ),
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
