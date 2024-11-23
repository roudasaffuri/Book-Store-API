const jwt = require("jsonwebtoken");

// Verify Token
function verifyToken(req,res,next){

    const token = req.headers.token;
    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.user = decoded;  // the id of the user in user
            next();
            }catch( error ){
                res.status(401).send({message: "Invalid Token"});
                }

    }else{
        return res.status(401).send({message: "No token provided."});
    }
}


// Verify Token & Authorize the user 
function verifyTokenAndAuthorize(req,res,next){
     // () => {...} arrow function like next()
     // if token exists it continue to arrow function and check if the id on the header is the same id params
    verifyToken(req,res, () => { 
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
            }else{
                res.status(403).send({message: "You are not authorized to access this resource."});
    }
});
}

// Verify Token & Admin 
function verifyTokenAndAdmin(req,res,next){
   verifyToken(req,res, () => { 
       if(req.user.isAdmin){
           next();
           }else{
               res.status(403).send({message: "You are not authorized to access , only admin allowed"});
   }
});
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorize,
    verifyTokenAndAdmin
};


