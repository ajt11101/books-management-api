const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
