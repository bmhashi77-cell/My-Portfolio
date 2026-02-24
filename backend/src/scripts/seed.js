require('dotenv').config({ path: '../../.env' })
const { connectDB } = require('../config/db')
const User = require('../models/User')
const Project = require('../models/Project')
const Post = require('../models/Post')

const sampleProjects = [
  {
    title: 'DevOps Dashboard',
    description: 'Real-time observability dashboard for k8s workloads.',
    techStack: ['React', 'Node', 'Docker'],
    githubUrl: 'https://github.com/your/devops-dashboard',
    liveUrl: 'https://devops.example.com',
    featured: true,
  },
  {
    title: 'AI Resume Ranker',
    description: 'ATS-friendly resume ranking microservice.',
    techStack: ['Express', 'MongoDB', 'OpenAI'],
    githubUrl: 'https://github.com/your/ai-resume',
  },
  {
    title: 'Finance Tracker',
    description: 'Personal finance PWA with offline cache.',
    techStack: ['React', 'Redux', 'Workbox'],
  },
  {
    title: 'SaaS Billing API',
    description: 'Stripe-based subscription billing boilerplate.',
    techStack: ['Node', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com/your/billing-api',
  },
  {
    title: 'Portfolio v3',
    description: 'Animated portfolio with 3D cards and CMS backend.',
    techStack: ['React', 'Three.js', 'Express'],
    liveUrl: 'https://portfolio.example.com',
    featured: true,
  },
  {
    title: 'Content Planner',
    description: 'Kanban board for social content planning.',
    techStack: ['React', 'Node', 'MongoDB'],
  },
]

const samplePosts = [
  {
    title: 'How I ship full-stack apps fast',
    excerpt: 'Tooling, conventions, and CI/CD tips.',
    content: 'Markdown content here',
    tags: ['productivity', 'devops'],
  },
  {
    title: 'Designing resilient APIs',
    excerpt: 'Rate limits, retries, and observability.',
    content: 'Markdown content here',
    tags: ['api', 'backend'],
  },
]

const run = async () => {
  await connectDB()
  await User.deleteMany({})
  await Project.deleteMany({})
  await Post.deleteMany({})

  const passwordHash = await User.hashPassword('admin123')
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' })
  await Project.insertMany(sampleProjects)
  await Post.insertMany(samplePosts)

  console.log('Seeded admin + sample projects/posts')
  console.log({ email: admin.email, password: 'admin123' })
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})