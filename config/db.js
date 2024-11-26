const mongoose = require("mongoose");


async function connectToDB(){
    //Connection To Database
    // New syntax for connection to the database , with try and catch
try{
   await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
        } catch (error) {
            console.log("Connection Failed To MongoDB!",error);
            }
}
module.exports = connectToDB;
//     Connection To Database
//     Old syntax for connection to the database:
// 
//     mongoose.connect(process.env.MONGO_URI)
//     .then(()=>console.log("Connected To mondoDB..."))
//     .catch((error)=> console.log("Connection Failed To MongoDB!",error));

