const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { signToken } = require('../utils/tokens')

const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const exists = await User.findOne({ email })
  if (exists) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already registered' })
  const passwordHash = await User.hashPassword(password)
  const user = await User.create({ name, email, passwordHash, role: role || 'admin' })
  const token = signToken(user)
  res.status(StatusCodes.CREATED).json({ user: { id: user._id, name, email, role: user.role }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+passwordHash')
  if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' })
  const match = await user.comparePassword(password)
  if (!match) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' })
  const token = signToken(user)
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
}

const me = async (req, res) => {
  const { user } = req
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

module.exports = { register, login, me }