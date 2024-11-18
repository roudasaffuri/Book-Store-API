const { required } = require("joi");
const mongoose=require("mongoose");
const Joi = require("joi");

//Book Schema 
// Schema :  is a structure that defines how data is organized and managed within a database.
//  סכימה היא מבנה המגדיר כיצד הנתונים מאורגנים ומנוהלים בתוך מסד נתונים 
const BookSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        // trim function : ensures that if someone saves " The Great Gatsby " as the title, it will be stored as 
        //"The Great Gatsby" without leading or trailing spaces.
        trim : true,   
        minlength : 3,
        maxlength : 250

    },

    //In Mongoose, establishing a relationship (or reference) between two schemas is often done by using 
    //Schema.Types.ObjectId with a ref property, as in your author field example.
    author: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Author"
    },
    description : {
        type : String,
        required : true ,
        trim : true,
        minlength : 5,
    },
    price : {
        type : Number ,
        required : true,
        min : 0 ,

    },
    cover :{
        type : String ,
        required : true,
        enum :["soft cover" , "hard cover"]
    }
},
{timestamps:true});


// Book Model 
const Book = mongoose.model("Book",BookSchema);


//Validate Create Book
function validateCreateBook(obj) {
    const schema = Joi.object({
        title:Joi.string().min(3).max(250).trim().required(),
        author:Joi.string().required(),
        description : Joi.string().trim().min(5).required(),
        price:Joi.number().positive().integer().min(0).required(),
        cover:Joi.string().valid("soft cover" , "hard cover").required(),
    })
    return schema.validate(obj);
}

// Validate Update Book 
const validateUpdateBook = (obj) =>{
    const schema = Joi.object ({
        title:Joi.string().min(3).max(250).trim(),
        author:Joi.string(),
        description : Joi.string().trim().min(5),
        price:Joi.number().positive().integer().min(0),
        cover:Joi.string().valid("soft cover" , "hard cover")
    })
    return schema.validate(obj);
}

module.exports={
    Book,
    validateCreateBook,
    validateUpdateBook
}