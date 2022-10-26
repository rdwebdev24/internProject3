const express = require('express');
const {GetTask,createTask,Updatestatus,deleteAll,deleteTask,updateTask} = require('./Controller.js')

const router = express.Router();

router.route('/:id/status').put(Updatestatus)
router.route('/').get(GetTask).put(deleteAll).post(createTask)
router.route('/:id').delete(deleteTask).put(updateTask)

module.exports =  router