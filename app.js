const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authorPath = require("./routes/authors")
const bookPath= require("./routes/books")
//Connection To Database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected To mondoDB..."))
    .catch((error)=> console.log("Connection Failed To MongoDB!",error));
// Init App
const app = express();
// Apply middlwares
app.use(express.json());
// Routes
app.use("/api/books",bookPath)
app.use("/authors",authorPath);

//Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)})
