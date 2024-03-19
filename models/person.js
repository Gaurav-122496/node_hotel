// const { model } = require("mongoose");

const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

 
// define the person schema
const personSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    age: {
        type: Number

    },

    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },

    mobile:{
        type: String,
        required: true

    },

    email:{
        type: String,
        required:true,
        unique: true
    },

    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    }
});

personSchema.pre('save',async function(next){
    const person= this;
    //hash the password only if it has been modified (or its new)
    if(!person.isModified('password')) return next();

    try{
        // hash password genrate 
        const salt = await bcrypt.genSalt(10);
        // hash passoword
        const hashedPassword = await bcrypt.hash(person.password,salt);
        // overrides the plain password with the hashed one 
        person.password= hashedPassword;
        next();

    }catch(err){
        return next(err);
    }
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt to compare the  provided password with the hashed password 
        const isMatch= await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;

    }
}
// create person models 
const person= mongoose.model('Person',personSchema)

module.exports = person;


