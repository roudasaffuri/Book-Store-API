const mongoose=require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        trim : true,   
        minlength : 5,
        maxlength : 200,
        unique : true,
    },
    username : {
        type: String,
        required : true,
        trim : true,   
        minlength : 2,
        maxlength : 200,
    }, 
    password : {
        type : String,
        required : true,
        trim : true,   
        minlength : 6,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },

},{
    timestamps : true
});




//User Model 
const User = mongoose.model("User",UserSchema);

// Validate Register User
function validateRegisterUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().required().trim().min(5).max(200),
        username : Joi.string().required().trim().min(2).max(200),
        password : Joi.string().required().trim().min(6),
    })
    return schema.validate(obj);
}


// Validate Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().required().trim().min(5).max(200),
        password : Joi.string().required().trim().min(6),
    })
    return schema.validate(obj);
}


// Validate Update User
function validateUpdateUser(obj){
    const schema = Joi.object({
        email : Joi.string().email().trim().min(5).max(200),
        username : Joi.string().trim().min(2).max(200),
        password : Joi.string().trim().min(6),

    })
    return schema.validate(obj);
}


module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
}
