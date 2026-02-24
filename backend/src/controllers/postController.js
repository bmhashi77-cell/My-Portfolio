const { StatusCodes } = require('http-status-codes')
const Post = require('../models/Post')

const listPosts = async (req, res) => {
  const { page = 1, limit = 10, search = '', tag } = req.query
  const query = {}
  if (search) query.title = { $regex: search, $options: 'i' }
  if (tag) query.tags = tag

  const total = await Post.countDocuments(query)
  const items = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))

  res.json({ items, total })
}

const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  if (!post) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' })
  res.json(post)
}

const createPost = async (req, res) => {
  const post = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json(post)
}

const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!post) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' })
  res.json(post)
}

const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ slug: req.params.slug })
  if (!post) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Post not found' })
  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = { listPosts, getPost, createPost, updatePost, deletePost }