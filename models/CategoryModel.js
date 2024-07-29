const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryname: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Category", categorySchema);