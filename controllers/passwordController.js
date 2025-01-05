const { User }= require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const asyncHandler = require("express-async-handler");

/**
 * @desc Get Forget Password view
 * @route /password/forgot-password
 * @method Get
 * @access public
 * 
 */ 

module.exports.getForgotPasswordView = asyncHandler((req,res)=>{
res.render('forgot-password');
});


/**
 * @desc Send Forget Password view
 * @route /password/forgot-password
 * @method POST
 * @access public
 * 
 */ 

module.exports.sendForgotPasswordLink = asyncHandler( async (req,res)=>{
    //console.log(req.body.email);

    const user = await User.findOne({email : req.body.email });
    if(!user){
        return res.status(404).json({message: "user not found !"});
    }
    
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({id : user._id , email : user.email }, secret, {expiresIn : "10m"});
    const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;
    res.json({message : 'Click on the link' , resetPassword : link});
    });



/**
 * @desc Get Reset Password Link
 * @route /password/reset-password/:UserId/:token
 * @method GET
 * @access public
 * 
 */ 

module.exports.getResetPasswordView = asyncHandler( async (req,res)=>{
    
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({message: "user not found ! hello"});
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try
    {
        jwt.verify(req.params.token ,secret );
        res.render('reset-password' , {email : user.email});
    }catch(error){
        console.log(error);
        res.json({message: "Error"});
    }
});




/**
 * @desc  Reset Password The Password
 * @route /password/reset-password/:UserId/:token
 * @method POST
 * @access public
 * 
 */ 

module.exports.resetThePassword = asyncHandler( async (req,res)=>{
    
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({message: "user not found !"});
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try
    {
        jwt.verify(req.params.token ,secret );
        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user.password = req.body.password;
        await user.save();
        res.render('success-password');
    }catch(error){
        console.log(error);
        res.json({message: "Error"});
    }
    });


