const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const auth = async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token provided' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('+passwordHash')
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' })
    req.user = user
    next()
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' })
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Admin only' })
  }
  next()
}

module.exports = { auth, requireAdmin }