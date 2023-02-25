// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const config = {
    entry: {
        index: './ts/index.ts',
        app: './scss/app.scss',
        home: './scss/pages/home.scss'
    },
    output: {
        path: path.resolve(__dirname, '../../public'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        // css extraction into dedicated file
        new MiniCssExtractPlugin({
            filename: './css/[name].min.css'
        }),
        new RemoveEmptyScriptsPlugin()
    ],
    optimization: {
        // minification - only performed when mode = production
        minimizer: [
            // js minification - special syntax enabling webpack 5 default terser-webpack-plugin 
            `...`,
            // css minification
            new CssMinimizerPlugin(),
        ],
        removeEmptyChunks: true
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

    } else {
        config.mode = 'development';
    }
    return config;
};
