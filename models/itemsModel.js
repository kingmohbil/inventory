const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 80,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: [
      'friuts_vegetables',
      'dairy',
      'sweet_snacks',
      'salty_snacks',
      'drinks',
      'icecream',
    ],
    required: true,
  },
  price: {
    type: Number,
    min: 0.1,
    required: true,
  },
  number_in_stock: {
    type: Number,
    min: 0,
  },
  url: {
    type: String,
    default: `/${this.category}/${this._id}`,
  },
});

module.exports = mongoose.model('items', itemSchema);
