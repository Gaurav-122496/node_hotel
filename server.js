const express = require('express')
const app = express();
// export db.js  file 
const db= require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

const person= require('./models/person');
const Menu= require('./models/Menu');

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


app.listen(3000,()=>{
 console.log('listening on port 3000')

})
