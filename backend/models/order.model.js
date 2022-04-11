const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order: [
    {
      name: { type: String },
      surname: { type: String },
      address: { type: String },
      email: { type: String },
      phone: { type: String },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);