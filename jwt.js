const jwt = require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
  
  //first check request header has authorized or not

  const authorization = req.headers.authorization
  if(!authorization)return res.status(401).josn({error:'Token not found'});

    //extract the token from request header 
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).josn({error: 'Unauthorization'});

    try{

        // verify the token 
      const decoded =  jwt.verify(token,process.env.JWT_SECRET);

      //attach the user information to the request object 
      req.user= decoded;
      next();

    }catch(err){
        console.error(err);
        res.status(500).josn({error: 'Invalid token'});

    }
}

  //function generate the token 
  const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
  }


module.exports={jwtAuthMiddleware,generateToken}
