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
      userID:{ type: String, unique: true,sparse:true },
      token:{ type: String,require:true },
    },
    todoData:[{data:{type:String}}]
})
const todo_collection = mongoose.model("tododata",todoDataStructure)

module.exports = {todo_collection}