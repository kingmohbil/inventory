const mongoose = require('mongoose'); // requiring mongoose to craete the schema and the model
const Schema = mongoose.Schema; // creating the Schema object
// creating a new schema for the category
const categorySchema = new Schema({
  name: {
    // validations of the name field
    type: String,
    minLength: 1,
    maxLength: 80,
    required: true,
  },
  description: {
    // validations of the description field
    type: String,
    minLength: 10,
    maxLength: 500,
    required: true,
  },
  // validation of the url field
  url: {
    type: String,
    required: true,
  },
});
// exporting our model
module.exports = mongoose.model('categories', categorySchema);
