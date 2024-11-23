const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { verifyTokenAndAuthorize ,verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const{User , validateUpdateUser} = require("../models/User")



/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */

router.put("/:id" ,verifyTokenAndAuthorize ,  asyncHandler(async(req,res)=>{


    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
        }
    
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id , {
        $set:{
            email : req.body.email,
            password : req.body.password,
            username : req.body.username,
        }
    } , { new : true }).select("-password"); //.select("-password") = updateUser and hidden the password 

    res.status(200).json(updateUser);
}));



/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */

router.get("/" ,verifyTokenAndAdmin ,  asyncHandler(async(req,res)=>{

    const users = await User.find().select("-password");
    res.status(200).json(users);
    })
);

module.exports = router;