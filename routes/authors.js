const express = require("express");
const router = express.Router();
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken");
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorsController");



//   authors/

router.get("/", getAllAuthors);

//   authors/:id

router.route("/id")
            .get(getAuthorById)
            .post(verifyTokenAndAdmin ,createAuthor)
            .put(verifyTokenAndAdmin ,updateAuthor)
            .delete( verifyTokenAndAdmin,deleteAuthor);


router;


router;


router;





module.exports = router;