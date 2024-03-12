const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');



// post method for save menu data in database
router.post('/',async(req,res)=>{
    try{
      const data = req.body;
      const newmenu = new Menu(data);
      // save the newmenu  data to database
      const newdata = await newmenu.save();
      console.log('data saved');
      res.status(200).json(newdata)
  
    }catch(err){
      res.status(500).json({error: ' inetrnal server error'});
    }
  })
  
  // get method to get menu items 
  router.get('/',async(req,res)=>{
    try{
      const data = await Menu.find();
      console.log("data fetched");
      res.status(200).json(data);
    }catch(err){
      res.status(500).json({error:'internal server error'});
  
    }
  })
  
  // get method for praticular data like taste 
  router.get('/:tasteType',async(req,res)=>{

    const tasteType= req.params.tasteType;
    try{
      if(tasteType=='sweet'||tasteType=='sour'||tasteType=='spicy'){

        const data = await Menu.find({taste:tasteType});
        console.log('data fetched');
        res.status(200).json(data);
      }else{
        res.status(400).json({error: 'Invalid taste type'});
      }

    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Intenal server problem'});

    }
  })

  // method for update menu item in monngo db 

  router.put('/:id',async(req,res)=>{
    try {
      const menuId =req.params.id;
      const updatedMenu =  req.body;
      const response =  await Menu.findByIdAndUpdate(menuId,updatedMenu,{
        new: true,
        runValidators: true,
      })
      if(!response){
        return res.status(404).json({error: 'Menu not found'});
      }
      console.log('data updated');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server problem'});
    }
  })

  // method to delete the data from mongodb
  router.delete('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id;
      const response = Menu.findByIdAndDelete(menuId);
      if(!response){
        return res.status(404).json({error: 'menuItem is not found'});
      }
      console.log('data deleted');
      res.status(200).json(response);

    } catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server problem'});
    }
  })

 // comment edit for texting purpose
  module .exports = router;
