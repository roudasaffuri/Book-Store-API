const express = require("express");
const logger = require("./middlewares/logger");
const {notFound , errorHandler} = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");


//Connection To Database
connectToDB();


// Init App
const app = express();


// Apply middlwares
app.use(express.json());
app.use(logger);


app.set("view engine", "ejs");


// Routes
app.use("/api/books",require("./routes/books"))
app.use("/authors",require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));



// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)



//Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)})
