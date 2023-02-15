const mongoose = require('mongoose'); // requiring mongoose for creating the Schema and the model
const Schema = mongoose.Schema; // creating the Schema object
// creating the items schema
const itemSchema = new Schema({
  name: {
    //validation of the name field
    type: String,
    minLength: 1,
    maxLength: 80,
    required: true,
  },
  description: {
    // validation of the description field
    type: String,
    minLength: 10,
    maxLength: 500,
    required: true,
  },
  category: {
    // validation of the category field and refrencing the categories collection
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  price: {
    // validation of the price field
    type: Number,
    min: 0.1,
    required: true,
  },
  number_in_stock: {
    //validation of the number_in_stock field
    type: Number,
    min: 1,
    required: true,
  },
  url: {
    //validation of the url field
    type: String,
    required: true,
  },
});
// exporting our application
module.exports = mongoose.model('items', itemSchema);
