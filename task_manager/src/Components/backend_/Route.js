const express = require('express');
const {GetTask,createTask,deleteAll,deleteTask,updateTask} = require('./Controller.js')

const router = express.Router();

router.route('/').delete(deleteAll)
router.route('/:id').delete(deleteTask).put(updateTask).get(GetTask).post(createTask)

module.exports =  router