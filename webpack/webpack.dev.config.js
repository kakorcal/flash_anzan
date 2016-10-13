import webpack from 'webpack'
import path from 'path'
import validate from 'webpack-validator'

const config = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve('client/app.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(),
    publicPath: '/public/',
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
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=10000'
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
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin({multiStep: true})
  ]
};

export default validate(config)