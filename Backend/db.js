const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB successfully!");
    });
};

module.exports = connectToMongo;
