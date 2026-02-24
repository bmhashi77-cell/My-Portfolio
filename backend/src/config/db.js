const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGO_URL || process.env.MONGODB_URI
  if (!uri) throw new Error('MONGO_URL is required')
  await mongoose.connect(uri)
  console.log('✅ MongoDB connected')
}

module.exports = { connectDB }