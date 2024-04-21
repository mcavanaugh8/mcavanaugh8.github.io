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
    displayName: {
      type: String,
      required: false,
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
