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
  create_date:{
    type: Date,
    default: Date.now
  },
  highest_level: {
    type: Number,
    default: 0
  },
  total_win: {
    type: Number,
    default: 0
  },
  total_lose: {
    type: Number,
    default: 0
  },
  activity_log: {
    type: Object,
    default: {}
  }
});

const User = mongoose.model('User', UserSchema);

export default User