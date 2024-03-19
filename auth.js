// this passport is use for authenticate the user
const passport= require('passport');
const localStrategy = require('passport-local').Strategy;
const person= require('./models/person');

// method for authenticate the username and password
passport.use(new localStrategy(async(username,password,done)=>{
    //authentication logic here
    try{
    // console.log('Recieved credential:', username,password);
     const user= await person.findOne({username});
     if(!user){
       return done(null,false,{message: 'Incorrect username'});
     }
 
    //  const isPasswordMatch = user.comparePassword(password);
    const isPasswordMatch= user.password===password ? true: false;
     if(isPasswordMatch){
       return done(null,user);
     }else{
       return done(null,false ,{message:'Incorrect Password.'});
 
     }
    }catch(err){
     return done(err);
    }
  }));

  module.exports= passport;  // export the configure password


