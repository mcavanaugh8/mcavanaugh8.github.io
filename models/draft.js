const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const draftSchema = new Schema(
  {
    draft: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: false
    },
    user: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
