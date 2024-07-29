const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    usertype: {
        type: String,

    },


    profileimage: {
        type: String
    }

    // is_admin: {
    //     type: String,
    //     required: true
    // },

    // is_verified: {
    //     type: Number,
    //     default: 0
    // }
},
    {
        timestamps: true // This will automatically add createdAt and updatedAt fields
    });

module.exports = mongoose.model("user", userSchema);