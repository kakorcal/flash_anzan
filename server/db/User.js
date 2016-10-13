import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  google_id: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    default: 'https://robohash.org/foo'
  },
  highest_level: {
    type: Number,
    default: 1
  },
  win_loss_ratio: {
    type: Number,
    default: -1
  },
  create_date:{
    type: Date,
    default: Date.now
  },
  activity_log: {
    type: Object
  },
});

const User = mongoose.model('User', UserSchema);

export default User