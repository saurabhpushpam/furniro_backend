var mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order'
  },

  payment_date: {
    type: Date,
    default: Date.now
  },

  amount: {
    type: Number
  },

  paymentmethod: {
    type: String,

  },

  status: {
    type: String,
  }
},
  {
    timestamps: true
  });

module.exports = mongoose.model('payment', paymentSchema);