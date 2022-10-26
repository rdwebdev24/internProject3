// const {todo_collection} = require("./Mongodb");
const uuid = require('uuid');


let todoArray = [];

const GetTask =  (req, res) => {
   console.log("get");
   res.status(200).send({status:200,msg:"success",data:todoArray})
   
}


const createTask =  (req, res) => {
     console.log("create",req.body);
     const newTodo = {
          id:uuid.v4(),
          data:req.body.data,
          completed:req.body.status
     }
     todoArray.push(newTodo);
     res.status(201).send({status:201,msg:"created",data:todoArray});
};


const deleteTask =  (req, res) => {
     console.log("deleted");
     const {id} = req.params;
     console.log(req.params,"...id");
     todoArray = todoArray.filter((item)=>item.id!=id)
     console.log(todoArray,"...array");
     res.status(200).send({status:200,msg:"deleted",data:todoArray});
};



const deleteAll =  (req,res) => {
     console.log("delete all");
     todoArray = [];
     res.status(200).send({status:200,msg:"deleted",data:todoArray});
}

const updateTask =  (req, res) => {
     console.log("updated");
     const {id} = req.params;
     let idx = todoArray.findIndex((item)=>item.id==id)
     todoArray[idx].data = req.body.data;
     res.status(200).send({status:200,msg:"updated",data:todoArray});
};

const Updatestatus = (req,res) => {
     console.log("status");
     const idx = todoArray.findIndex(items=>items.id==req.params.id)
     if(todoArray[idx].completed){
          todoArray[idx].completed = false;
     }else{
          todoArray[idx].completed = true;
     }
     res.status(200).send({status:200,msg:"completed",data:todoArray})
}

module.exports = { Updatestatus,GetTask, deleteTask,deleteAll, createTask, updateTask };
