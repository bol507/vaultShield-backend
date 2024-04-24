const mongoose = require('mongoose');
const config = require('./utils/config')


const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;