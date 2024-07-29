const { Timestamp } = require("mongodb");
var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    productname: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },


    descriptionimage: {
        type: Array,
        // required: true,
        validate: [arrayLimit, "you can pass upto 2 product images"]

    },

},
    {
        timestamps: true
    }
);

function arrayLimit(val) {
    return val.length <= 2;
}


module.exports = mongoose.model("product", productSchema);