const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

  name: { type: String, required: 'Product name cannot be left blank.' },

  sku:    { type: String, required: 'Product sku cannot be left blank.', unique: true },

  description: { type: String, required: 'Product description cannot be left blank.' }
});

module.exports = mongoose.model('Products', productSchema);