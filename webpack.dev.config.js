const path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        port: 8081,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true
    },
    entry: path.join(__dirname, 'src/musicPlayer.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|mp3)$/,
                use: 'url-loader?limit=8192'
            }]
    }
}
