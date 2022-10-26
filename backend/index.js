const express = require('express')
const cors = require('cors');
const PORT = 5000;

UserRouter =  require('./Route.js')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/',(req,res)=>{
     res.status(200).send({status:200,msg:"success"})
})
app.use('/task',UserRouter)
app.use(express.urlencoded({extended:false}))


app.listen(PORT,()=>{
     console.log(`server is listening on ${PORT}`);
})