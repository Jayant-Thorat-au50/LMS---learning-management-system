
const errorMiddleware = (err,res) => {

    const statusCode = err.statusCode || 500
    const message = err.message || 'Something went wrong'

return res.status(statusCode).json({
  success:false,
  message:message,
  stack:err.stack
})

next()
}

export default errorMiddleware