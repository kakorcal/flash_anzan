import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password_digest: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    default: 'http://lorempixel.com/150/150/'
  },
  highest_level: {
    type: String,
    default: 'N/A'
  },
  create_date:{
    type: Date,
    default: Date.now
  },
  win_lose_ratio: {
    type: Number,
    default: -1
  },
  activity_log: {
    type: Object
  }
});

const User = mongoose.model('User', UserSchema);

export default User