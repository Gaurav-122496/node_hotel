const express = require('express')
const app = express();
// export db.js  file 
const db = require('./db');
require('dotenv').config();


const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT|| 3000;
// const Menu= require('./models/Menu');


// middleware function 
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.orignalUrl}`);
  next();  // move on to next phase 
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false})


app.get('/', function (req, res) {
  res.send('welcome to my hotel...')
})
 

// imports the router file
const personRoutes= require('./routes/perosnRoutes');
// use the routes 
app.use('/Person', personRoutes);  

// import the router files
const menuRoutes= require('./routes/menuRoutes');
// use the router
app.use('/Menu',menuRoutes);




app.listen(PORT,()=>{
 console.log('listening on port 3000')

})

