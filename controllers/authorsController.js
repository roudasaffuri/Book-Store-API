const asyncHandler = require("express-async-handler");
 // replace the try and catch make the code more clear and clean
const {Author,validateCreateAuthor,validateUpdateAuthor} = require("../models/Authors");


/**
 * @desc Get all Authors
 * @route /authors
 * @method Get
 * @access public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
    const {paginNumber} = req.query;
    if(paginNumber){
    const authorsPerPage = 2;
  
          const listAuthors = await Author.find()
                                          .skip((paginNumber -1)*authorsPerPage )
                                          .limit(authorsPerPage);
           res.json(listAuthors).status(200); 
           }else{
            const authors = await Author.find();
            res.json(authors).status(200);
            }
  });

/**
 * @desc Get Author By Id
 * @route /authors/:id
 * @method Get
 * @access public
 */
const getAuthorById = asyncHandler( async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        return res.status(200).json(author);
    } else {
        return res.status(404).json({ msg: "No Author found with that ID!" });
    } 
});

/**
 * @desc Create New Author
 * @route /authors
 * @method Post
 * @access private (only admin)
 */
const createAuthor = asyncHandler(async (req, res) => {
    const { error } = validateCreateAuthor(req.body);

    if (error) return res.status(400).send({ messege: error.details[0].message });

    const author = new Author ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality, 
        image: req.body.image
    });
    const result = await author.save();
    res.status(201).json(result);

  });

/**
 * @desc update author
 * @route /authors/:id
 * @method PUT
 * @access private (only admin)
 */
const updateAuthor = asyncHandler(async (req, res) => {
    const {error} = validateUpdateAuthor(req.body);
    if(error) return res.status(400).send({messege : error.details[0].message});

    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image
        }
      }, { new: true });
      
      if (!updatedAuthor) return res.status(404).json({ message: "Author not found" });
      res.status(200).json(updatedAuthor);
});

/**
 * @desc delete Author
 * @route /authors/:id
 * @method delete
 * @access private (only admin)
 */
const deleteAuthor = asyncHandler( async (req, res) => {
    const author = await Author.findById(req.params.id);
    if(author) {
     await Author.findByIdAndDelete(req.params.id);
     res.status(200).json({message : "author has been deleted !"})
    }else{
     res.status(404).json({message : "No such author found!"})
    }
 });


  module.exports ={
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
  }