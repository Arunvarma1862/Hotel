const  mongoose= require('mongoose');

// const mongoURL= 'mongodb://127.0.0.1:27017/hotels'
 
const mongoURL='mongodb+srv://arunbabu120894:arun12345@cluster0.nvkps0n.mongodb.net/'
mongoose.connect(mongoURL)

const db= mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongoDB server')
})
db.on('error',(err)=>{
    console.log('MongoDB connection error',err)
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
})

module.exports=db