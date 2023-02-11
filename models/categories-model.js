const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
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
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('categories', categoriesSchema);
