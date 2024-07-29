const mongoose = require('mongoose');

const cartitemsSchema = mongoose.Schema({
  cartid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
  },

  productvarientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productvarient',
  },

  quantity: {
    type: Number,

  },

},
  {
    timestamps: true
  });

module.exports = mongoose.model('cartItems', cartitemsSchema);