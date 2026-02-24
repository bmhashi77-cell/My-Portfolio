const { StatusCodes } = require('http-status-codes')
const Project = require('../models/Project')

const listProjects = async (req, res) => {
  const { page = 1, limit = 9, search = '', tech, featured } = req.query
  const query = {}
  if (search) query.title = { $regex: search, $options: 'i' }
  if (tech) query.techStack = tech
  if (featured !== undefined) query.featured = featured === 'true'

  const total = await Project.countDocuments(query)
  const items = await Project.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))

  res.json({ items, total })
}

const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id)
  if (!project) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' })
  res.json(project)
}

const createProject = async (req, res) => {
  const project = await Project.create(req.body)
  res.status(StatusCodes.CREATED).json(project)
}

const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!project) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' })
  res.json(project)
}

const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Project not found' })
  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject }