require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const { connectDB } = require('./config/db')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const postRoutes = require('./routes/postRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express()
const PORT = process.env.PORT || 8000
const CLIENT_URL = process.env.CLIENT_URL || '*'

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: CLIENT_URL === '*' ? '*' : [CLIENT_URL], credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(xss())
app.use(morgan('dev'))
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/contact', contactRoutes)

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  await connectDB()
  app.listen(PORT, () => console.log(`API running on port ${PORT}`))
}

start()