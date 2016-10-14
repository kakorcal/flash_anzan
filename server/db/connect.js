import mongoose from 'mongoose'
const db = mongoose.connection;

export default (DATABASE_URL) => {
  mongoose.connect(DATABASE_URL);
  mongoose.Promise = Promise; 
  db.on('error', console.error.bind(console, 'Mongo connection Error : '));
  db.once('open', () => console.log('Mongo connection ok'));
};