const errorMiddleware = (err, req, res, next) => {
    statusCode = err.statusCode || 500;
    message = err.message || "Something went wrong";
  
   return res.status(statusCode).json({
      success: false,
      message: message,
      stack: err.stack,
    });
  };
  
module.exports = {errorMiddleware}