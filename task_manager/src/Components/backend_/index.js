const express = require('express')
const cors = require('cors');
require('dotenv').config();
const {register,login} = require('./Controller.js')
const auth = require("./auth");
const PORT = process.env.REACT_APP_PORT

UserRouter =  require('./Route.js')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/task',UserRouter)
app.use(express.urlencoded({extended:false}))

app.get('/register',(req,res)=>{
     res.status(200).send("registerHTML")
})
app.post('/register',register)
app.post('/login',login)

app.listen(PORT,()=>{
     console.log(`server is listening on ${PORT}`);
})