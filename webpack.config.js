const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const entry = {};
['generator', 'object', 'converter', 'url', 'function', 'builder', 'mapping']
    .forEach(util => entry[util] = `./${util}/index.ts`);

module.exports = {
    entry: entry,
    output: {
        filename: `./[name].min.js`,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: `${__dirname}/report/bundle-report.html`
        })
    ],
    externals: {
        'reflect-metadata': 'reflect-metadata'
    },
};
