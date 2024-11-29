const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorize ,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { updateUser, getAllUsers, getUserById, deleteUser } = require("../controllers/userController");


//    / users/
router.get("/" ,verifyTokenAndAdmin , getAllUsers);

// chaining  Method 
//    / users/id
router.route("/:id")
                .put(verifyTokenAndAuthorize ,updateUser)
                .get(verifyTokenAndAdmin ,getUserById)
                .delete(verifyTokenAndAdmin ,deleteUser);


module.exports = router;