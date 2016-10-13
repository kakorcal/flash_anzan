import mongoose from 'mongoose'
const path = process.env.DATABASE_URL || 'mongodb://localhost/flash_anzan';
const db = mongoose.connection;

export default () => {
  mongoose.connect(path);
  mongoose.Promise = Promise; 
  db.on('error', console.error.bind(console, 'Mongo connection Error : '));
  db.once('open', () => console.log('Mongo connection ok'));
};