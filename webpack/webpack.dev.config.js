import webpack from 'webpack'
import path from 'path'
import validate from 'webpack-validator'

const fontAwesomePath = path.resolve('webpack/config/font-awesome-sass.config.js');
const config = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    'bootstrap-loader',
    `font-awesome-sass!${fontAwesomePath}`,
    path.resolve('client/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve('client')
        ],
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"]
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
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  node:  {
    // for using jwt in browser
    net: 'empty',
    dns: 'empty'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({multiStep: true})
  ]
};

export default validate(config)