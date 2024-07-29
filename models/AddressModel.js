var mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
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

  //   location:{
  //     type: {type: String, required: true},
  //     coordinates: []
  // }

},
  {
    timestamps: true
  }
);

// storeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('address', addressSchema);