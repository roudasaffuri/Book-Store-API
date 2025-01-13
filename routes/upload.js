const express = require('express');
const router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"../images"));
    },
    filename : function(req,file,cb){
        // new Date().toISOString().replace(/:/g, '-') ==> this is the name of the image uploaded
        //cb(null,new Date().toISOString().replace(/:/g, '-'));
        // put the date first allow to put many image in the same name
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});
// in js if the key and the value the same name you can wirte it like this ({ storage })
const upload = multer({storage:storage}); 

//  /api/upload
router.post("/" ,upload.single("image") ,(req,res)=>{
    res.status(200).json({message : "image upload"});
})


module.exports=router;