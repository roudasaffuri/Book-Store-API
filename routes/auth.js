const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User ,validateLoginUser,validateRegisterUser} = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post("/register" , asyncHandler(async(req,res)=>{
    const {error} = validateRegisterUser(req.body);
    if(error) {
        return res.status(400).json({message : error.details[0].message});
    }

    // if user not null:
    let user = await User.findOne({email : req.body.email});
    if(user) {
        return res.status(400).json({message : "Email already exists"});
        }

    const  salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
    // if user null : 
    user = new User({
        email : req.body.email ,
        username : req.body.username ,
        password : req.body.password ,
        isAdmin : req.body.isAdmin,
    });
    // save user to database
    const result = await user.save();
    const token = null ;

    const {password , ...other} = result._doc;
    res.status(201).json({token , ...other});

    
}));

module.exports = router;
