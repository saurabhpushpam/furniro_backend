var mongoose = require('mongoose');
const orderitemSchema = mongoose.Schema({
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
  },

  productvarientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productvarient',
  },

  quantity: {
    type: Number
  },

  // price: {
  //   type: Number
  // },

  // color: {
  //   type: String
  // },

  // size: {
  //   type: String
  // }

},
  {
    timestamps: true
  });

module.exports = mongoose.model('orderitems', orderitemSchema);