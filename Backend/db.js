const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    console.log('MongoDB Connected Successfully...');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Stop the application on failure
  }
};

module.exports = connectDB;
