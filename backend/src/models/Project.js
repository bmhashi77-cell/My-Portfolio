const mongoose = require('mongoose')
const slugify = require('slugify')

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    githubUrl: String,
    liveUrl: String,
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

projectSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next()
  this.slug = slugify(this.title, { lower: true, strict: true })
  next()
})

module.exports = mongoose.model('Project', projectSchema)