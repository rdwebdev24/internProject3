const express = require('express');
const {GetTask,createTask,getOneTask,deleteAll,deleteTask,updateTask} = require('./Controller.js')

const router = express.Router();

router.route('/').get(GetTask).post(createTask).delete(deleteAll)
router.route('/:id').delete(deleteTask).put(updateTask).get(getOneTask)

module.exports =  router