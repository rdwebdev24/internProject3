const {todo_collection} = require("./Mongodb");
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')
const login = async (req,res) => {
     try {
          const {email,password} = req.body;
          if(!(email && password)) {return res.status(400).send({status:400,msg:"please enter username or password"})}

          const userData = await todo_collection.findOne({'user.email':email.toLowerCase()})
          console.log("user : ",userData);
          if (userData && userData.user && (await bcrypt.compare(password, userData.user.password))) {
               const token = jwt.sign(
                 { user_id: userData._id, email },
                 TOKEN_KEY,
                 {
                   expiresIn: "24h",
                 }
               );
               userData.user.token = token;
               return res.status(200).json({status:200,user:userData});
             }
          res.status(400).send({status:401,msg:"Invalid Credentials"});
     } catch (error) {
          console.log(error.Message);
     }
}

const register = async (req,res) => {
     console.log("register");
     try {
          const {first_name,last_name,email,password} = req.body;
          if(!(email && password && first_name && last_name)) {return res.status(400).send({status:400,msg:"All inputs are required"});}

          const oldUser = await todo_collection.find({'user.email':email.toLowerCase()});
          if(oldUser.length!=0) {return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}
          const encryptedPassword = await bcrypt.hash(password,10);
          const userId = uuid.v4();
          console.log('userId',userId);
          console.log('body...',req.body);
          const userData = await todo_collection.create({
               user:{
                    first_name,
                    last_name,
                    email:email.toLowerCase(),
                    password:encryptedPassword,
                    userID:userId
               },
               todoData:[]
          })
          console.log('user...',userData);
          const token = jwt.sign(
               { user_id: userData._id, email },
               TOKEN_KEY,
               {expiresIn: "24h",});
               userData.user.token = token;
               
          return res.status(201).send({status:201,user:userData});
     } catch (error) {
          console.log(error.Message);
     }
}



const GetTask = async (req, res) => {
   console.log("get");
   const {id} = req.params
     try {
          const data = await todo_collection.find({'user.userID':`${id}`});
          res.status(200).send(data);
     } catch (err) {
          console.log(err.Message);
          res.status(503).send(err.Message);
     }
};


const createTask = async (req, res) => {
     console.log("create");
     const task = req.body;
     const {id} = req.params;
     console.log(id,task,'body id');
     if(task=='') return req.status(400).send({status:400,msg:'input required'})
     const ID = new Date().getTime();
     const newData = { id:ID, data: task.data };
     try {
          todo_collection.updateOne({"user.userID":id},{$push: {"todoData" : newData}})
          const data = await todo_collection.find({'user.userID':id})
          console.log("crated user data",data);
          res.status(200).send(data);
     } catch (error) {
          console.log(error.Message);
          res.status(503).send(error.Message);
     }
};






const deleteTask = async (req, res) => {
     console.log("deleted");
  try {
     todo_collection.deleteOne({"id":req.params.id},function(){});
     const data = await todo_collection.find({})

     res.status(200).send(data);
     } catch (err) {
     console.log(err.Message);
     res.status(503).send(err.Message);
  }
};



const deleteAll = async (req,res) => {
     console.log("delete all");
     try {
          todo_collection.remove({});
          const data = await todo_collection.find({});
          console.log("data : ",data);
          res.status(200).send(data);
     } catch (error) {
          console.log(error.Message);          
          res.status(503).send(error.Message)
     }
}


const updateTask = async (req, res) => {
     console.log("updated");
  try {
       todo_collection.updateOne({"id":req.params.id},{"data":req.body.data},function(){})
       const Data = await todo_collection.find({})
       res.status(200).send(Data);
  } catch (err) {
       res.status(503).send(err.Message);
  }
};



// const getOneTask = (req, res) => {
//   console.log("get one");
//   const { id } = req.params;
//   const singleData = Data.filter((item) => item.id == id);
//   res.status(200).send(singleData);
// };


module.exports = { register,GetTask, login, deleteTask,deleteAll, createTask, updateTask };
