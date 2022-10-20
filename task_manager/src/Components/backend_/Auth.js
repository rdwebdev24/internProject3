const jwt = require("jsonwebtoken");
const TOKEN = process.env.REACT_APP_TOKEN_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log("auth token ",token);
  if (!token) {
     console.log("not token");
    return res.status(403).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, TOKEN ,(err,decode)=>{
     if(err){console.log('yahi pe hai error',err);}
     else{
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