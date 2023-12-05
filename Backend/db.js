const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoURI = `${process.env.MONGO_URI}`;

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Connected to MongoDB successfully!");
  });
};

module.exports = connectToMongo;
