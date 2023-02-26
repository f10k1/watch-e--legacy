// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');

const isProduction = process.env.NODE_ENV == 'production';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const copyImages = () => {
    if (fs.existsSync(`../../public/images`)) {
        fs.rmSync(`../../public/images/*`, { force: true });
    }
    else {
        fs.mkdirSync(`../../public/images`);
    }

    fs.readdirSync(`./images`).forEach(file => {
        fs.copyFileSync('./images/' + file, '../../public/images/' + file);
    });

    console.log("Images copied")
};

const createIcons = () => {
    if (fs.existsSync(`../../public/icons`)) {
        fs.rmSync(`../../public/icons/*`, { force: true });
    }
    else {
        fs.mkdirSync(`../../public/icons`);
    }

    const filelist = [];

    fs.readdirSync(`./icons`).forEach(file => {
        filelist.push(file.split('.').slice(0, -1).join('.'));
        fs.copyFileSync('./icons/' + file, '../../public/icons/' + file);
    });

    const iconslist = filelist.map(file => `.icon--${file} { mask: url(../icons/${file}.svg); -webkit-mask: url(../icons/${file}.svg) }`);
    if (!fs.existsSync(`../../public/css`)) {
        fs.mkdirSync(`../../public/css`);
    }

    fs.writeFileSync(`../../public/css/icons.css`, `${iconslist.join(' ')} [class^=icon--],[class*=" icon--"]{width:24px;height:24px;display:block;-webkit-mask-size:cover;mask-size:cover;background-color:#000;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:50% 50%;mask-position:50% 50%;}`);
    console.log("Created icons")
};

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
    copyImages();
    createIcons();
    return config;
};
