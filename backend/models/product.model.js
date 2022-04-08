const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  text: { type: String },
  type: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
