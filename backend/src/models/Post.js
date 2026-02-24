const mongoose = require('mongoose')
const slugify = require('slugify')

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

postSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next()
  this.slug = slugify(this.title, { lower: true, strict: true })
  next()
})

module.exports = mongoose.model('Post', postSchema)