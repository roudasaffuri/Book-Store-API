const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema({
    firstName: { type: String,
         maxlength: 50 ,
         minlength :3,
         trim:true,
         required: true,
     },
     lastName: { type: String,
        required: true,
        maxlength: 50 ,
        minlength :3,
        trim:true,
    },
     nationality: { 
        type: String,
        required: true,
        maxlength: 100 ,
        minlength :3,
        trim:true,
    },
    image: { type: String,
        default:"default-avatrpng"
    },
     
},{ timestamps:true});

const Author = mongoose.model("Author",AuthorSchema);

// Validate Update Author 
const validateUpdateAuthor = (obj) =>{
    const schema = Joi.object ({
        firstName: Joi.string().min(3).max(20).trim(),
        lastName: Joi.string().min(3).max(50).trim(),
        nationality: Joi.string().min(3).max(100).trim(),
        image: Joi.string(),
    })
    return schema.validate(obj);
}

//Validate Create Author
function validateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(20).trim().required(),
        lastName: Joi.string().min(3).max(50).trim().required(),
        nationality: Joi.string().min(3).max(100).trim().required(),
        image: Joi.string(),
    })
    return schema.validate(obj);
}

module.exports={Author,
    validateCreateAuthor,
    validateUpdateAuthor
};