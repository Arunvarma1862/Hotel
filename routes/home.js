const express= require('express');

const router= express.Router()

router.get('/',function(req,res){
    res.send('Hello World, Welcome to hotel')
 })
 

 module.exports=router