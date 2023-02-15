const mongoose = require('mongoose');
// a function to connect to the database that we are requiring in our application
module.exports = async (connectionString) => {
  try {
    console.log('connecting to the database...');
    await mongoose.connect(connectionString);
    console.log('connected to database successfully');
  } catch (err) {
    console.log('failed to connect to database...');
    console.error(err.message);
  }
};
