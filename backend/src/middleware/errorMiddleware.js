const { StatusCodes } = require('http-status-codes')

const notFound = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND)
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  res.status(status)
  res.json({
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  })
}

module.exports = { notFound, errorHandler }