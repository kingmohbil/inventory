const mongoose = require('mongoose');
module.exports = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log('connected to database successfully...');
  } catch (err) {
    console.log('failed to connect to database...');
    console.error(err.message);
  }
};
