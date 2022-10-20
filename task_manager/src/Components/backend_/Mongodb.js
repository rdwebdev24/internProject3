const mongoose =  require('mongoose');
const MONGO_URL = process.env.REACT_APP_MONGO_URL

mongoose.connect(MONGO_URL).then((ans) => {
console.log("ConnectedSuccessful")
}).catch((err) => {
  console.log("Error in the Connection")
})

// todo collection //
const Schema = mongoose.Schema; 

const todoDataStructure = new Schema({
    user:{
      first_name:{ type: String, default: null },
      last_name:{ type: String, default: null },
      email:{ type: String, unique: true },
      password:{ type: String ,require:true},
      userID:{ type: String, unique: true },
      token:{ type: String,require:true },
    },
    todoData:[{id:{type:String},data:{type:String}}]
})
const todo_collection = mongoose.model("tododata",todoDataStructure)

// user data //
// const userSchema = new mongoose.Schema({
//      first_name: { type: String, default: null },
//      last_name: { type: String, default: null },
//      email: { type: String, unique: true },
//      password: { type: String },
//      token: { type: String },
//    });

// const User = mongoose.model("user", userSchema)

// module.exports = {todo_collection,User}
module.exports = {todo_collection}