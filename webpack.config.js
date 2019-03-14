const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: 'static',
    reportFilename: `${__dirname}/bundle-report.html`
  })
];

const entry = {};
['file', 'generator', 'object', 'synchronized']
  .forEach(util => entry[util] = `./${util}/index.ts`);

module.exports = {
  entry,
  devtool: 'source-map',
  output: {
    filename: "./[name]/[name].min.js",
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
