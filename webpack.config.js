const path              = require('path');
const webpack           = require('webpack');
const autoprefixer      = require('autoprefixer');
const postcss           = require('postcss');
const precss            = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = [
  {
    devtool: 'source-map',
    performance: {
      hints: false
    },
    context: path.join(__dirname, './public/js/src'),
    entry: {
      js: './entry.js'
    },
    output: {
      path: path.join(__dirname, './public/js'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /node_modules/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
        },
        {
          test: /\.tag$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: 'riot-tag-loader'
        },
        {
          test: /\.js$|\.tag$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.tag', '.css']
    },
    plugins: [
      new webpack.ProvidePlugin({
        riot: 'riot',
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      }),
      // Have to minify when production deployment.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.WatchIgnorePlugin([
        path.resolve(__dirname, './node_modules/'),
      ]),
    ]
  },
  {
    context: path.join(__dirname, './public/css/sass'),
    entry: {
      style: './style.scss'
    },
    output: {
      path: path.join(__dirname, './public/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:[
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: '192.168.33.10',  // edit
        reloadDeley: 0,
        cors: true,
        injectChanges: true,
        injectCss: true,
        open: false,
        watchOptions: {
          awaitWriteFinish : true,
          ignoreInitial: true,
          ignored: [],  // edit
        },
        files: []  // edit
      },{reload: false})
    ]
  }
];
