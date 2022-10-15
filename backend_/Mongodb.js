const mongoose =  require('mongoose');
const {MONGO_URL} = process.env

mongoose.connect(MONGO_URL).then((ans) => {
console.log("ConnectedSuccessful")
}).catch((err) => {
  console.log("Error in the Connection")
})

// todo collection //
const Schema = mongoose.Schema; 
const todoDataStructure = new Schema({
     id:{type:Number,require:true},
     data:{type:String,require:true}
})
const todo_collection = mongoose.model("tododata",todoDataStructure)

// user data //
const userSchema = new mongoose.Schema({
     first_name: { type: String, default: null },
     last_name: { type: String, default: null },
     email: { type: String, unique: true },
     password: { type: String },
     token: { type: String },
   });

const User = mongoose.model("user", userSchema)

module.exports = {todo_collection,User}