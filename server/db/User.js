import mongoose from 'mongoose'
import shortid from 'shortid'

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
    default: `https://robohash.org/${shortid.generate()}`
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