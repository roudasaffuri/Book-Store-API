//Seeding a database with external data


const {Book} = require("./models/Book");
const {Author} = require("./models/Authors");
const {books,authors} = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();


// Connection to Database
connectToDB();


// Import Books
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books Imported successfully");
        process.exit(0); // Exit with success
    } catch (error) {
        console.error("Error importing books:", error.message);
        process.exit(1); // Exit with failure
    }
};

// Import Authors
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors Imported successfully");
        process.exit(0); // Exit with success
    } catch (error) {
        console.error("Error importing Authors:", error.message);
        process.exit(1); // Exit with failure
    }
};

// Remove Books

const removeBooks = async () => {
    try {
        // Deletes all books in the collection
        await Book.deleteMany();
        console.log("Books removed successfully");
    } catch (error) {
        console.error("Error removing books:", error);
        // Exit the process with an error code
        process.exit(1); 
    }
};

const removeAuthors = async ()=>{
    try {
        // Deletes all books in the collection
        await Author.deleteMany();
        console.log("Author removed successfully");
    } catch (error) {
        console.error("Error removing books:", error);
        // Exit the process with an error code
        process.exit(1); 
    }
};


if (process.argv[2] === "-import"){
    importBooks();
    } else if (process.argv[2] === "-remove"){
        removeBooks();
    }else if (process.argv[2] === "-import-authors"){
        importAuthors();
    }else if (process.argv[2]=="-remove-authors"){
        removeAuthors();
    }

// Terminal : 
// to run file js on terminal you need to write first node and then the name of the file like "seeder"
// process.argv[2] ==> index 2 from the santnace on cmd 
// process.argv[2] === "-import" ==> index
//                                          index:   0     1      2  
// PS C:\Users\rsaff\Desktop\nodejs\Book-Store-API> node seeder -import/-remove

//                                          index:   0     1      2  
// PS C:\Users\rsaff\Desktop\nodejs\Book-Store-API> node seeder -import-authors/-remove-authors

// important
// process.argv[0]: The path to the Node.js executable.
// process.argv[1]: The path to the script being executed.
// process.argv[2] and beyond: Additional arguments passed to the script.