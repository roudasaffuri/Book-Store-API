const path = require('path');

const imagePath = path.join(__dirname,"images")
console.log(imagePath);
// node test  -->  C:\Users\rsaff\Desktop\nodejs\Book-Store-API\images


console.log(__dirname);

// node test  -->    directore name C:\Users\rsaff\Desktop\nodejs\Book-Store-API



// 2025-01-10T13:51:33.355Z
console.log(new Date().toISOString());

// to replace the ":" with "-"
//2025-01-10T13-52-40.800Z
console.log(new Date().toISOString().replace(/:/g, '-'));

// MONGO_URI=mongodb://localhost/bookStoreDB
// MONGO_URII=mongodb://localhost/rouda
// PORT=5000
// NODE_ENV=development
// JWT_SECRET_KEY=secretKey1234567890
// EMAIL_AP=saffuri87@gmail.com
// PASSWORD_AP=ermd rjoc bgoz laic


