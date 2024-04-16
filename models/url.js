const mongoose = require('mongoose')

const urlSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{type:Number}}] 
                 
},{timestamps:true})
const url= mongoose.model('url',urlSchema);
module.exports=url

