import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from 'morgan'
import routes from './routes/index'
import connectdb from './db/connect'
import db from './db/index'
import {PORT, NODE_ENV, DATABASE_URL} from './config/env'

const app = express();
let template;

if(NODE_ENV === 'development'){
  const webpack = require('webpack');
  const devConfig = require(path.resolve('webpack/webpack.dev.config')).default;
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(devConfig);
  template = path.resolve('webpack/dev.template.html');
  
  app.use(devMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true,
      chunkModules: false
    }
  }));

  app.use(hotMiddleware(compiler));
}else{
  template = path.resolve('build/index.html');
  // the built bundle.js is put in here
  app.use(express.static('./build'));  
}

connectdb(DATABASE_URL);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);

app.get('/*', (req, res)=>{
  res.sendFile(template);
});

app.listen(PORT, (err)=>{
  if(err) console.log(err);
  console.log(`Listening to port ${PORT}`);
});