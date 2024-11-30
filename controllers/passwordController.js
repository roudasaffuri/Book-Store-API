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