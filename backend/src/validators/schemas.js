const { z } = require('zod')

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['admin', 'user']).optional(),
  }),
})

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
})

const projectSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    techStack: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional().or(z.literal('')),
    liveUrl: z.string().url().optional().or(z.literal('')),
    images: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
  }),
})

const postSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    excerpt: z.string().min(10),
    content: z.string().min(20),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional().or(z.literal('')),
  }),
})

const messageSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(3),
    message: z.string().min(10),
  }),
})

module.exports = { registerSchema, loginSchema, projectSchema, postSchema, messageSchema }