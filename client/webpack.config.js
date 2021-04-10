const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.(js||jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    'file-loader'
                ]
            }
            
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        port: 8080,
        hot: true,
        contentBase: './dist',
        historyApiFallback: true
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    }

}