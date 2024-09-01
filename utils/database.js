const mongoose = require('mongoose');
const dotenv = require('dotenv');
let isConnected = false; // Track the connection

const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  dotenv.config();
  
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    console.log("isConnected")
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDB };
