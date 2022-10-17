const {todo_collection, User} = require("./Mongodb");
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req,res) => {
     try {
          const {email,password} = req.body;
          if(!(email && password)) {return res.status(400).send({status:400,msg:"please enter username or password"})}

          const user = await User.findOne({email:email.toLowerCase()})
          console.log("user : ",user);
          if (user && (await bcrypt.compare(password, user.password))) {
               const token = jwt.sign(
                 { user_id: user._id, email },
                 TOKEN_KEY,
                 {
                   expiresIn: "24h",
                 }
               );
               user.token = token;
               return res.status(200).json({status:200,user:user});
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

          const oldUser = await User.find({email:email.toLowerCase()});
          if(oldUser.length!=0) {return res.status(400).send({status:409,msg:"User Already exist. Please Log In"})}
          const encryptedPassword = await bcrypt.hash(password,10);

          const user = await User.create({
               first_name,
               last_name,
               email:email.toLowerCase(),
               password:encryptedPassword
          })
          
          const token = jwt.sign(
               { user_id: user._id, email },
               TOKEN_KEY,
               {expiresIn: "24h",});
               user.token = token;
               res.status(201).send({status:201,user:user});

     } catch (error) {
          console.log(error.Message);
     }
}


const GetTask = async (req, res) => {
     console.log("get");
     try {
          const data = await todo_collection.find({});
          res.status(200).send(data);
     } catch (err) {
          console.log(err.Message);
          res.status(503).send(err.Message);
     }
};


const createTask = async (req, res) => {
     console.log("create");
     const task = req.body;
     const id = new Date()
     const newData = { id:id, data: task.data };
     try {
          todo_collection.create(newData);
          const data = await todo_collection.find({})
          res.status(200).send(data);
     } catch (error) {
          console.log(err.Message);
          res.status(503).send(err.Message);
     }
};



const deleteTask = async (req, res) => {
     console.log("deleted");
  try {
     todo_collection.deleteOne({"id":req.params.id},function(){});
     const data = await todo_collection.find({})
     res.status(200).send(data);
     } catch (error) {
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
  } catch (error) {
       res.status(503).send(err.Message);
  }
};



const getOneTask = (req, res) => {
  console.log("get one");
  const { id } = req.params;
  const singleData = Data.filter((item) => item.id == id);
  res.status(200).send(singleData);
};


module.exports = { register,GetTask, login,getOneTask, deleteTask,deleteAll, createTask, updateTask };
