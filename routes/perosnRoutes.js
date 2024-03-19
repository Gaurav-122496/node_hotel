const express = require('express');
const router = express.Router();
const person= require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


// post method to save perosn data in database 
router.post('/signup',async(req,res)=>{
    try{
      const data = req.body // assuming that request body conatins person data 
      const newPerson = new person(data);
  
      // save the new perosn to the database
      const response = await newPerson.save();
      console.log('data saved');
      
      const payload={
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));

      const token = generateToken(payload);
      console.log("token is:",token);

      res.status(200).json({response:response,token:token});
  
    }catch(err){
      console.log(err);
      res.status( 500).json({error: 'internal server error'});
    } 
  })
  // login route 

  router.post('/login',async(req,res)=>{
    try{
      // Extract the username and passowrd from requset body 
      const {username,password}=req.body;

      //find the username and password from database 
      const user = await person.findOne({username:username});

      //if user does not exist or password does not match
      if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
      }
      // generate token 
      const payload={
        id: user.id,
        username: user.username
      }
      const token = generateToken(payload);
      //return token as response
      res.json({token});
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })

//  profile route 
   router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{

      const userData= req.user;
      console.log("User Data :", userData);

      const userId= userData.id;

      const user = await person.findById(userId);
      res.status(200).json({user});

    }catch(err){
      console.error(err);
      res.status(500).json({error:'Internal server error'});
    }
   });




  // get method to get person data
router.get('/',jwtAuthMiddleware, async(req,res)=>{

    try{
      const data= await person.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      res.status( 500).json({error: 'internal server error'});
    }
  })

  
  // get person data with some endpoints like we want person who is working as a manager
router.get('/:workType',async(req,res)=>{
    const workType= req.params.workType;  // extract the work type  from the url parameter
  
     try{
      if(workType=='chef'||workType=='manager'|| workType=='waiter'){
        const response = await person.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(400).json({error: ' Invalid work type'});
      }
     }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal serevr error'});
     }
  })  

  // method for upadate the data through put or patch method 
router.put('/:id',async(req,res)=>{
    try{
      const personId = req.params.id; //extract the id from url parameters
      const updatedPersonData =  req.body; // updated person data
      const response = await person.findByIdAndUpdate(personId ,updatedPersonData,{
       new: true, // return the updated document 
       runValidators: true, // run mongoose validaion 
      })
      if(!response){
        return res.status(404).json({error: 'person not found'});
      }
      console.log('data updated');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server Error'});
    }
  })


  // method to delete the person data from mongodb
  router.delete('/:id',async(req,res)=>{
    try{
      const personId = req.params.id;
      // assuming you have prson model 
      const response = await person.findByIdAndDelete(personId);
      if(!response){
        return res.status(404).json({error: 'person not found'});
      }
      console.log('data deleted');
      res.status(200).json({message:'person deleted successfully'});
    }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
    }
  })
  module.exports = router;
 