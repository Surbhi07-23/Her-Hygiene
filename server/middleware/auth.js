const jwt = require("jsonwebtoken");

const auth = (req , res , next) => {         //auth : middleware
    try{
        
        const authHeader = req.headers.authorization;   //Authorization: Bearer abc123xyzTOKEN      ,    authHeader = "Bearer abc123xyzTOKEN"

        if(!authHeader){
            return res.status(401).json({
                message : "No Token. Access Denied"
            })
        }

        const token = authHeader.split(" ")[1];   //[0] = "Bearer"   [1] = "abc123xyzTOKEN" --> token
        
        const verified = jwt.verify(token , process.env.JWT_SECRET);  //verify:  1)Checks token signature  2)Checks expiration   3)Decodes payload
        //now if token is valid , "verified" has payload
        
        req.user = verified;   //here we are creating a new property in req object called user which will have payload  .. So next middleware or route can access logged-in user by using req.user.name etc
        next();
    }
    catch(error){
        res.status(401).json("Invalid token");
    }
}

module.exports = auth;