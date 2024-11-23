const express = require("express");
const mongoose = require("mongoose");
const bookPath= require("./routes/books");
const authorPath = require("./routes/authors");
const authrPath = require("./routes/auth");
const usersPath = require("./routes/users");
const logger = require("./middlewares/logger");
const {notFound , errorHandler} = require("./middlewares/errors");
const dotenv = require("dotenv");
dotenv.config();


//Connection To Database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected To mondoDB..."))
    .catch((error)=> console.log("Connection Failed To MongoDB!",error));


// Init App
const app = express();


// Apply middlwares
app.use(express.json());
app.use(logger);


// Routes
app.use("/api/books",bookPath)
app.use("/authors",authorPath);
app.use("/api/auth", authrPath);
app.use("/api/users", usersPath);



// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)



//Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)})
