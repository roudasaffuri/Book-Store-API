const express = require("express");
const logger = require("./middlewares/logger");
const {notFound , errorHandler} = require("./middlewares/errors");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require("./config/db");

const path = require('path');


//Connection To Database
connectToDB();


// Init App
const app = express();

// Static Folder middlware
app.use(express.static(path.join(__dirname,"images")));


// Apply middlwares
app.use(express.json());

//middlware urlencoded
// parse data coming from forms (like username and password)
//extended: false means it works for simple data(key:value)
app.use(express.urlencoded({extended:false}));
app.use(logger);

// Use Helmet to secure HTTP headers (add header to the response)
app.use(helmet());


// Enable CORS for all routes
app.use(cors());

// To allow only React app (running on port 3000) to use the API
// app.use(cors({ origin: "http://localhost:3000" }));

// To allow any origin to access the API (this is equivalent to the first one)
// app.use(cors()); or app.use(cors({ origin: "*" }));



// Set View Engine
app.set("view engine", "ejs");


// Routes
app.use("/api/books",require("./routes/books"))
app.use("/authors",require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));



// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)



//Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)})
