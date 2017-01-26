const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCssPlugin = require('purifycss-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const validate = require('webpack-validator');
// const fontAwesomePath = path.resolve('webpack/config/font-awesome-sass.config.js');

const config = {
  entry: {
    app: ['babel-polyfill', path.resolve('client')],
    styles: [
      path.resolve('node_modules', 'bootstrap/dist/css', 'bootstrap.css'),      
      path.resolve('node_modules', 'font-awesome/css', 'font-awesome.css'),
      path.resolve('client/styles', 'base.scss')
    ],
    react: ["react", "react-chartjs2", "react-dom", "react-redux", "react-router"],
    redux: ["redux", "redux-logger", "redux-thunk"],
    utils: ["axios", "howler", "classnames", "jsonwebtoken", "lodash", "shortid", "validator"]
    // ["axios", "classnames", "howler", "jsonwebtoken", "lodash", "react", "react-chartjs2", "react-dom", "react-redux", "react-router", "redux", "redux-logger", "redux-thunk", "shortid", "validator"]
  },
  output: {
    publicPath: '/',
    path: path.resolve('build'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /client/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test: /\.(wav|mp3)?$/,
        loader: "file-loader"
      },
      // {
      //   test: /bootstrap-sass\/assets\/javascripts\//,
      //   loader: 'imports?jQuery=jquery'
      // },
      {
        test: /\.(jpe?g|png|gif|svg(\?v=\d+\.\d+\.\d+)?)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 3 versions', '> 1%']
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  node:  {
    // for using jwt in browser
    net: 'empty',
    dns: 'empty'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('webpack/prod.template.html'),
      filename: 'index.html',
      hash: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['styles', 'app', 'react', 'redux', 'utils', 'manifest']
    }),
    new CleanWebpackPlugin(['build'], {
      root: process.cwd(),
      verbose: true
    }),
    // new PurifyCssPlugin({
    //   basePath: process.cwd(),
    //   paths: [path.resolve('client')],
    //   purifyOptions: {
    //     minify: true,
    //     info: true
    //   }
    // }),
    new AppCachePlugin({
      exclude: ['.htaccess']
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

module.exports = validate(config);