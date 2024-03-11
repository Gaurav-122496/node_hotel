const mongoose= require('mongoose')

const menuSchema = new mongoose.Schema({

    name:{
        type :String,
        required: true

    },

    price: {
        type: Number,
        required: true
    },

    taste:{
        type: String,
        enum:['sweet','spicy','sour'],
        required: true
    },
    isdrink:{
        type: Boolean,
        default: false
    }

})

 // create menu module
 const menu= mongoose.model('menu',menuSchema);

 module.exports=menu;
