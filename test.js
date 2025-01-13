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