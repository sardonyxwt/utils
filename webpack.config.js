const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');

const entry = {
  utils: './src/index.ts'
};

const plugins = [
  new CleanWebpackPlugin('dist'),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: `${__dirname}/bundle-report.html`
  })
];

fs.readdirSync('./src/util').forEach(file => {
  entry[file.split('.')[0]] = `./src/util/${file}`;
});

module.exports = {
  entry,
  devtool: 'source-map',
  output: {
    filename: "./dist/[name].min.js",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins
};
