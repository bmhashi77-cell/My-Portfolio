const router = require('express').Router()
const { listPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController')
const { auth, requireAdmin } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')
const { postSchema } = require('../validators/schemas')

router.get('/', listPosts)
router.get('/:slug', getPost)
router.post('/', auth, requireAdmin, validate(postSchema), createPost)
router.put('/:slug', auth, requireAdmin, validate(postSchema), updatePost)
router.delete('/:slug', auth, requireAdmin, deletePost)

module.exports = router