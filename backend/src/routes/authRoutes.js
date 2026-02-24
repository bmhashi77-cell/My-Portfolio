const router = require('express').Router()
const { register, login, me } = require('../controllers/authController')
const { auth, requireAdmin } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')
const { registerSchema, loginSchema } = require('../validators/schemas')

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', auth, me)

module.exports = router