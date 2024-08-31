const path = require('path');

module.exports = {
    // The entry point of your application
    entry: './src/index.js',

    // The output configuration
    output: {
        filename: '[name].bundle.js', // Output file name
        path: path.resolve(__dirname, 'dist'), // Output directory
        library: 'ImageHost', // Name of your library
        libraryTarget: 'umd', // Universal Module Definition
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // Split all chunks
            cacheGroups: {
                quill: {
                    test: /[\\/]node_modules[\\/](quill)[\\/]/, // Match the quill package
                    name: 'quill', // Name of the output file for quill
                    chunks: 'all',
                },
            },
        },
    },
    // Configuration for the development server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    mode: "development",
    // Enable source maps for easier debugging
    devtool: 'inline-source-map',
};

