const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

    // get all tasks controller
    const getAllTasks = asyncWrapper(async (req, res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks }) 
        
    })

      // create new task controller
      const createNewTask = asyncWrapper(async (req, res) => {
        
          const task = await Task.create(req.body)
          if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
          //  return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
          }
          res.status(201).json(task);

    })

      // get single task controller
      const getSingleTask = asyncWrapper(async (req, res, next) => {
        
          // distructuring
          const {id:taskID} = req.params;
          const task = await Task.findOne({_id:taskID})
          if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
          //  return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
          }
          res.status(200).send({ task });
      
    })


      // Delete task controller
      const deleteTask = asyncWrapper(async (req, res) => {
     
          const {id:taskID} = req.params;
          const task = await Task.findOneAndDelete({_id:taskID})
          if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
            // return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
           }
          res.status(200).json({ task })
        
    })

      // Update task controller
      const updateTask = asyncWrapper(async (req, res) => {
      
          const {id:taskID} = req.params;
          const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true});
          if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
            // return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
           }
          res.status(200).json({task})
        
    })

    
    module.exports = {getAllTasks, createNewTask, getSingleTask, updateTask, deleteTask}