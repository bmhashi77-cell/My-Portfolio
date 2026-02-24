const router = require('express').Router()
const { createMessage, listMessages, deleteMessage } = require('../controllers/contactController')
const { auth, requireAdmin } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')
const { messageSchema } = require('../validators/schemas')

router.post('/', validate(messageSchema), createMessage)
router.get('/', auth, requireAdmin, listMessages)
router.delete('/:id', auth, requireAdmin, deleteMessage)

module.exports = router