// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
    entry: ['./ts/index.ts', './scss/app.scss'],
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
            }
        ],
    },
    plugins: [
        // css extraction into dedicated file
        new MiniCssExtractPlugin({
            filename: './css/app.min.css'
        }),
    ],
    optimization: {
        // minification - only performed when mode = production
        minimizer: [
            // js minification - special syntax enabling webpack 5 default terser-webpack-plugin 
            `...`,
            // css minification
            new CssMinimizerPlugin(),
        ]
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

    } else {
        config.mode = 'development';
    }
    return config;
};
