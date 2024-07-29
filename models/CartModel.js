var mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',

  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('cart', cartSchema);