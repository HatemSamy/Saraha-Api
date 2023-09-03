








export const globalErrorHandling = (err, req, res, next) => {

    const message = err.message
    const stack = err.stack
    const status = err.status ? err.status : "failed"
    const statusCode = err.statusCode ? err.statusCode : 500
  
  
    if (process.env.MOOD === "DEV") {
      res.status(statusCode).json({ status, message, stack })
  
    } else {
      res.status(statusCode).json({ message })
  
    }
  }