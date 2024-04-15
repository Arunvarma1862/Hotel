
const express= require('express');
const menu= require('../models/menu')

const router= express.Router()



router.post('/',async (req,res)=>{

    try{
       const data= req.body;
       const newMenu= new menu(data);
       const response = await newMenu.save()
       console.log('data saved successfully',response);
       res.status(200).json(response)
    }
    catch(err){
 
       console.log('Error',err);
       res.status(500).json({msg:"internal server error"})
 
    }
   
 })
 
 router.get('/',async (req,res)=>{
 
    try{
       
      const response= await menu.find()
       console.log('data fetched',response);
       res.status(200).json(response)
    }
    catch(err){
 
       console.log('Error',err);
       res.status(500).json({msg:"internal server error"})
 
    }
   
 })

 router.get('/:taste',async(req,res)=>{
    
   try{
    const tasteType= req.params.taste;
    if(tasteType =='Sweet'  || tasteType == "Spicy"  || tasteType == "Sour"){
         const response = await menu.find({taste: tasteType})
         res.status(200).json(response)
         console.log("data fetched")
    }
    else{
        
        res.status(404).json({msg:"UserNotFound"})

    }
   }
   catch(err){
        console.log('Error',err);
        res.status(500).json({msg:"Internal server error"})
   }
 })

 module.exports= router