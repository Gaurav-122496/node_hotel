// const mongoose = require('mongoose');

// // define the mongodb  connection url

// const mongoURL='mongodb://localhost:27017/hotels' // you can replace with your database name

// // set up mongodb connection

// mongoose.connect(mongoURL,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

// const db= mongoose.connection;

// // define the event listners for database connection 
// db.on('Connected',()=>{
//     console.log('connected to mongodb server');

// });

// db.on('error',(err)=>{
//     console.log('mongo db connection error');

// });

// db.on('disconnected',()=>{
//     console.log(' mongodb disconnected ');

// });

// // Exports the databese connection 

// module.exports= db;


const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // you can replace with your database name

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


  