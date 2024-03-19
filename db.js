const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL

 const mongoURL = process.env.MONGODB_URL_LOCAL;   //'mongodb://localhost:27017/hotels';   // you can replace with your database name

// url for mogo atlas online 
// const mongoURL= 'mongodb+srv://gaurav:happy555@cluster0.c23kfb8.mongodb.net/';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })


// // Set up MongoDB connection
  .then(() => {
    console.log('Connected to MongoDB sever');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  // export the database coonection 
  module.exports = mongoose.connection;