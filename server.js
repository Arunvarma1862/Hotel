// const jsonString ='{"name":"hello","age":23}';
// const jsonobject=JSON.parse(jsonString);
// console.log(jsonobject)

// const JsonObj ={name:"hello",age:23};
// const JsonStri=JSON.stringify(JsonObj);
// console.log(JsonStri);

// console.log(typeof JsonObj);
// console.log(typeof JsonStri)


const express= require('express')
const db = require('./db');
const homeRoute= require('./routes/home')
const personRoute= require('./routes/person')
const menuRoute= require('./routes/menu')
const taskRoute= require('./routes/task')
const urlRoute= require('./routes/url')
const app = express();
const bodyParser= require('body-parser')
require('dotenv').config();
// const PORT=8000;
const PORT = process.env.PORT || 3000;

//middlewares 
// commit for test


// app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));


//routes

app.use('/',homeRoute)
app.use('/person',personRoute);
app.use('/menu',menuRoute)
app.use('/api/tasks',taskRoute)
app.use('/url', urlRoute)


//server


app.listen(PORT,()=>{console.log(`server started at port ${PORT}`)})