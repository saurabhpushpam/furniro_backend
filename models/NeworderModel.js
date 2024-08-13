var mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  totalamount: {
    // type: String,
    type: Number

  },

  // orderdate: {
  //   type: Date,
  // },

  oredrstatus: {
    type: String,
    // active, success, failed
    default: 'active',

  },


  // cartitemid: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'cartItems',   // Reference to the cartItems model
  // },


  cartitemid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cartItems'
  }],


  quantity: {
    type: Number
  },


  firstname: {
    type: String
  },

  lastname: {
    type: String,
  },

  companyname: {
    type: String,

  },

  streetaddress: {
    type: String,

  },

  city: {
    type: String,

  },

  province: {
    type: String,

  },

  zipcode: {
    type: Number,
  },

  country: {
    type: String,

  },

  phone: {
    type: Number,

  },

  email: {
    type: String,

  },

  additionalinfo: {
    type: String,

  },

  orderdate: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model('neworder', orderSchema);