const Task = require('../models/Task')
const { throwAnError } = require('../errors/custom-error')


    // get all tasks controller
    const getAllTasks = async (req, res) => {
      try{
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
        if(!tasks){
      throwAnError();
      res.status(500).json({ meg: error.message})
        }
      }catch(error){
        res.status(500).json({ meg: error})
      }
        
    }

      // create new task controller
      const createNewTask = async (req, res) => {
        try {
          
          const task = await Task.create(req.body)
          res.status(201).json(task);
          if(!task){
            throwAnError();
            res.status(500).json({ msg: error.message})
          }
        } catch(error){
          // res.status(500).json({ msg: error.errors.name.message})
          // res.status(500).json({ msg: error})
           res.status(500).json({ msg: error})          
        }
    }

      // get single task controller
      const getSingleTask = async (req, res) => {
        try {
          
          // distructuring
          const {id:taskID} = req.params;
          const task = await Task.findOne({_id:taskID})
          if(!task){
           
           return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
          }
          res.status(200).send({ task });
        } catch (error) {
          res.status(500).json({ msg: error})
          
        }
      
    }


      // Delete task controller
      const deleteTask = async (req, res) => {
        try{
        
          const {id:taskID} = req.params;
          const task = await Task.findOneAndDelete({_id:taskID})
          if(!task){
            return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
           }
          res.status(200).json({ task })
        } catch(error){
          res.status(404).json({ msg: error})
        }
        
    }

      // Update task controller
      const updateTask = async (req, res) => {
        try{
        
          const {id:taskID} = req.params;
          const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true});
          if(!task){
            return  res.status(404).json({ msg: `there is no task with id : ${taskID}` })
           }
          res.status(200).json({task})
        }   catch(error){
          res.status(404).json({ meg: error})
        }
        
    }

    
    module.exports = {getAllTasks, createNewTask, getSingleTask, updateTask, deleteTask}