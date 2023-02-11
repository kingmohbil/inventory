const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 80,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 500,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  price: {
    type: Number,
    min: 0.1,
    required: true,
  },
  number_in_stock: {
    type: Number,
    min: 1,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('items', itemSchema);
