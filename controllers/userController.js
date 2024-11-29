const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const{User , validateUpdateUser} = require("../models/User")


/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
const updateUser =   asyncHandler(async(req,res)=>{


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
});

/**
 * @desc Get All Users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */

const getAllUsers =  asyncHandler(async(req,res)=>{

    const users = await User.find().select("-password");
    res.status(200).json(users);
    });


/**
 * @desc Get  Users By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */
const getUserById =  asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
    res.status(200).json(user);
    }else{
        res.status(404).json({message:"user not fount"});
    }
    });

    /**
 * @desc Delete  Users By Id
 * @route /api/users/:id
 * @method DELETE
 * @access private (only admin & user himself)
 */
const deleteUser =    asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        await User.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"user has been deleted successfully"});
    }else{
        res.status(404).json({message:"user not fount"});
    }
    });

module.exports={
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
}