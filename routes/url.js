const express= require('express');
const router= express.Router();

const URL= require('../models/url')

router.post('/',async (req,res)=>{

    try{
        const data= req.body;
        const url= new URL(data);
        const response= await url.save();
        console.log("data saved");
        res.status(200).json({msg:"data saved",response})
    }
    catch(err){
        console.log("Error",err)
        res.status(500).json({msg:"Internal server error"})
    }

})

router.get('/visit/:id',async (req,res)=>{

    try{
            const ID= req.params.id
            const response=await URL.findOne({_id:ID});
            if(!response){
                res.status(404).json({msg:'User Not Found'})
            }
            const views = response.visitHistory ? response.visitHistory.length : 0
            res.status(200).json({msg:"data fetched", visitHistory:response.visitHistory, views:views})      
    }
    catch(err){
        console.log("Error",err)
        res.status(500).json({msg:"Internal server error"})
    }

})
router.get('/:id', async (req, res) => {
    const visitID = req.params.id;
    
    try {
        const data = await URL.findOneAndUpdate(
            { _id: visitID },
            { $addToSet: { visitHistory: { timestamp: Date.now() } } }, // Using $addToSet to ensure uniqueness
            { new: true } // Return the updated document
        );
        
        if (!data) {
            return res.status(404).json({ msg: "URL not found" });
        }
        
        res.redirect(data.url);
        // res.json({msg:"fetched"})
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ msg: "Internal server error" });
    }
});
router.get('/remove/:id',async (req,res)=>{
    const removeID= req.params.id

    const response=await URL.updateOne({_id:removeID},{$unset:{ visitHistory:""}})
  res.json({msg:"deleted"})
})

module.exports=router