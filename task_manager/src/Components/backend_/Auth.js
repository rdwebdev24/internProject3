const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
     const token = req.headers['authorization'].split(' ')[1];
       console.log("token ",JSON.parse(token));
  if (!token) {
     console.log("not token");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log("try");
    jwt.verify(JSON.parse(token), config.TOKEN_KEY,(err,decode)=>{
     if(err){console.log('yahi pe hai error',err);}
     else{
          console.log(decode);
          console.log("decoded : ",decode);
          req.user = decode;
          return next();
     }
    });
  } catch (err) {
     console.log(err);
    return res.status(401).send("Invalid Token");
  }
};


// token generator //


module.exports = verifyToken;