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
    default: ''
  },
  highest_level: {
    type: String,
    default: '0'
  },
  create_date:{
    type: Date,
    default: Date.now
  },
  win_lose_ratio: {
    type: Number,
    default: 0
  },
  activity_log: {
    type: Object
  }
});

const User = mongoose.model('User', UserSchema);

export default User