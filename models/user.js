const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true,
    },
    drafts: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
