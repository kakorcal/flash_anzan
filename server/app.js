import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import routes from './routes/index'
import connectdb from './config/dbConfig'

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development'

if(env === 'development'){
  const webpack = require('webpack');
  const devConfig = require(path.resolve('webpack/webpack.dev.config')).default;
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(devConfig);

  app.use(devMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true,
      chunkModules: false
    }
  }));

  app.use(hotMiddleware(compiler));
}

connectdb();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/users', routes.users);

app.get('/*', (req, res)=>{
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Flash Anzan</title>
        <meta charset='utf-8'>
        <meta content='width=device-width, initial-scale=1' name='viewport'/>
      </head>
      <body>
        <div id='root'></div>
        <script src='/public/bundle.js'></script>
      </body>
    </html>
  `);
});

app.listen(port, (err)=>{
  if(err) console.log(err);
  console.log(`Listening to port ${port}`);
});