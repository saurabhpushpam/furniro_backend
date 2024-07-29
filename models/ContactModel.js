const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  name: {
    type: String
  },

  email: {
    type: String
  },

  subject: {
    type: String
  },

},
  {
    timestamps: true
  });

module.exports = mongoose.model('contact', contactSchema);