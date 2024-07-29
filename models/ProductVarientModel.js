var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },

  size: {
    type: String,

  },

  color: {
    type: String,
    // type: Array,

  },

  price: {
    type: String,

  },

  oldprice: {
    type: String,

  },

  tags: {
    type: String,

  },

  image: {
    // type: String,

    type: Array,
    required: true,
    validate: [arrayLimit, "you can pass upto 5 product images"]


  },

},
  {
    timestamps: true
  }
);

function arrayLimit(val) {
  return val.length <= 5;
}


module.exports = mongoose.model("productvarient", productSchema);