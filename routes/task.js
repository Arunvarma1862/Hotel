const express= require('express');
const task= require('../models/task')

const router= express.Router()



router.post('/',async (req,res)=>{
    try {
       const tasks = new task(req.body);
       await tasks.save();
       res.status(201).send(tasks);
       } catch (error) {
       res.status(400).send(error);
       }
 })
 
 router.get('/', async (req, res) => {
    try {
    const tasks = await task.find();
    res.status(200).send(tasks);
    } catch (error) {
    res.status(500).send(error);
    }
    })

    module.exports= router
 