
const logger = (req,res,next)=>{
    //${req.originalUrl} == ${ req.url}
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports=logger;