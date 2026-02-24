const { StatusCodes } = require('http-status-codes')
const Message = require('../models/Message')

const createMessage = async (req, res) => {
  const message = await Message.create(req.body)
  res.status(StatusCodes.CREATED).json({ message })
}

const listMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.json(messages)
}

const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id)
  if (!message) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Message not found' })
  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = { createMessage, listMessages, deleteMessage }