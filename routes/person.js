const express= require('express');
const person= require('../models/person')

const router= express.Router()


 router.post('/',async(req,res)=>{
   try{
    const data = req.body;
    const newPerson= new person(data);
    const response=await newPerson.save();
    console.log('data saved successfully',response)
    res.status(201).json(response)
   }
   catch(err){
    console.log(err);
    res.status(500).json({msg:"internal server error"})
   }   
 })
 
 router.get('/',async (req,res)=>{
    try{
 
       const data= await person.find();
       console.log('data fetched');
       res.status(200).json(data)
 
    }
    catch(err){
       console.log(err);
       res.status(500).json({msg:"internal server error"})
 
    }
 })
 
 router.get('/:work',async (req,res)=>{
    try{
       const workID= req.params.work
       if(workID == 'Chef'  || workID == "waiter"  || workID == 'manager'){
          const response= await  person.find({work:workID});
          console.log('data fetched')
          res.status(200).json(response)
       }
       else{
          res.status(404).json({msg:"User not found"})
       }
      
    }
    catch(err){
       console.log("Error",err)
       res.status(500).json({mgs:"internal server error"})
 
    }
 })

 router.get('/:id',async (req,res)=>{
    try{
       const id= req.params.id
       console.log(id)
       const data= await person.findOne({_id:id});
       console.log('data fetched');
       res.status(200).json(data)
 
    }
    catch(err){
       console.log(err);
       res.status(500).json({msg:"internal server error"})
 
    }
 })


 router.put('/:id',async(req,res)=>{
   try{
      const personID= req.params.id;
      const updatePersonData=  req.body;
      const updatedPerson= await person.findByIdAndUpdate(personID,updatePersonData,{
         new: true, // Return the updated document
         runValidators: true, // Run Mongoose validation
         
      });
      if (!updatedPerson) {
         return res.status(404).json({ error: 'Person not found'
         });
         }
         console.log('updated');
         res.status(200).json(updatedPerson)
         
   }catch(err){
      console.log('Error',err);
      res.status(500).json({msg:"internal server error"})

   }
 })

 router.delete('/:id',async(req,res)=>{

  try{
   const id= req.params.id;
   const remove = await  person.findByIdAndDelete(id);

   if(!remove){
      res.status(404).json({msg:"person not founds"})
   }
   console.log('deleted');
   res.json({msg:"No Content"})
  }
  catch(err){
   console.log("Error",err);
   res.status(500).json({msg:"Internal server error"})

  }

 })
 module.exports=router
 