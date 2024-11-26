const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const asyncHandler = require("express-async-handler");
 // replace the try and catch make the code more clear and clean
const {validateCreateBook,validateUpdateBook,Book}= require("../models/Book")



/**
 * @desc Get all books
 * @route /api/books
 * @method Get
 * @access public
 */         //  asyncHandler( .... route handler ... מטפל במסלול )
router.get("/" ,asyncHandler( async (req,res) => {
    
    console.log(req.query);
    const {minPrice , maxPrice } = req.query; 

    //The .populate() method in Mongoose is used to populate referenced fields in a document.
    // It allows you to retrieve data from related documents stored in different collections,
    // based on the references defined in your schema.
    // populate(2 arguments) :
    //First argument : "author": This is the field in the Book schema that references another collection (e.g., Author).
    //Second argument : ["_id", "firstName", "lastName"]: Specifies which fields to include from the related Author. 
    
    // Comparison Query Operators ==>   https://www.mongodb.com/docs/manual/reference/operator/query-comparison/
    // $eq  : Equal
    // $ne  : Not Equal
    // $gt  : Greater Than
    // $gte : Equal and Greater Than 
    // $lt  : Less Than
    // $lte : Equal and Less Than
    // $in  : In Array   $in:[8,9] ,
    // $nin : Not In Array

    // http://localhost:5000/api/books?minPrice=9&maxPrice=12  ? =query
    let books ;
    if(minPrice && maxPrice){
     books  = await Book.find({price : {$gte:minPrice , $lte:maxPrice}}).populate("author" , ["_id" ,  "firstName" , "lastName"]);
    res.json(books).status(200);
    }else{
        books  = await Book.find().populate("author" , ["_id" ,  "firstName" , "lastName"]);
    res.json(books).status(200);
    }
}
))


/**
 * @desc Get Book By Id
 * @route /api/books/:id
 * @method Get
 * @access public
 */
router.get("/:id" ,asyncHandler( async (req,res) => {
    const book = await Book.findById(req.params.id).populate("author");
    if(book){
    res.status(200).json(book);
    } else{
        res.status(404).json({message:"book not found"});
    }
}))

/**
 * @desc Create New Book 
 * @route /api/books/:id
 * @method Post
 * @access private (only admin)
 */                          
router.post("/" ,verifyTokenAndAdmin, asyncHandler( async(req,res) => {
    const { error } = validateCreateBook(req.body);
   
    if(error) return res.status(400).send({messege : error.details[0].message});

    const book = new Book( {
        title : req.body.title,
        author : req.body.author,
        description : req.body.description,
        price : req.body.price,
        cover : req.body.cover,
    });

    const result = await book.save();
    res.status(201).json(result);
}));

/**
 * @desc update book
 * @route /api/books/:id
 * @method put
 * @access private (only admin)
 */
router.put('/:id',verifyTokenAndAdmin ,asyncHandler( async (req, res) => {

    const {error} = validateUpdateBook(req.body);
    if(error) return res.status(400).send({messege : error.details[0].message});

   const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
    $set :{
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        cover : req.body.cover,
    }
   },{new:true});

   res.status(200).json(updatedBook);
   
}))

/**
 * @desc delete book
 * @route /api/books/:id
 * @method delete
 * @access private (only admin)
 */
router.delete('/:id',verifyTokenAndAdmin,asyncHandler( async (req, res) => {
 
   const book = await  Book.findById(req.params.id);
   if(book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "book has been deleted !"})
   }else{
    res.status(404).json({message : "No such book found!"})
   }
   
}))

module.exports =router;