const { Timestamp } = require('mongodb');
var mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  addressid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
  },

  totalamount: {
    // type: String,
    type: Number

  },

  orderdate: {
    type: Date,
    default: Date.now
  },

  oredrstatus: {
    type: String
  },

});

module.exports = mongoose.model('order', orderSchema);