const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


//register
router.post("/register" , async(req , res) => {
    try{
        const { name ,email , password} = req.body ;

        const  existingUser =  await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message : "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = new User({    //user document to be saved in DB
            name,
            email,
            password :hashedPassword
        });

        await user.save();      //This stores user in users collection
        
        res.status(201).json({
            message : "User registered successfully"  ,  //200 =  user created
            user : {
                name : user.name,
                email : user.email,
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : error.message}); //500 = server error
    }
}) 


//login
router.post("/login" , async(req , res) => {
    try{
        const {email , password} = req.body;

        //check user exists or not
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "User not found!"
            })
        }

        //if exists , check password
        const isMatch =  await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json("Invalid Password")
        };

        const token = jwt.sign(
            {id : user._id} ,   // payload (data inside token) .. to know which user is logged in
            process.env.JWT_SECRET ,  // secret .. to verify token is real
            {expiresIn : "7d"}   //expiry .. could be "1h" , "15m"
        );
        
        res.json({     //returns token to client
            token ,
            user : {
                id: user._id,
                name: user.name,
                email:user.email
            }
        });
    
    }

    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;