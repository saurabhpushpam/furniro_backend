var mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },

  rating: {
    type: Number,

  },

  comment: {
    type: String,
  },

},
  {
    timestamps: true
  });

module.exports = mongoose.model('review', reviewSchema);