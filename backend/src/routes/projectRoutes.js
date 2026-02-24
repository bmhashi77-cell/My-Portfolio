const router = require('express').Router()
const {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')
const { auth, requireAdmin } = require('../middleware/authMiddleware')
const { validate } = require('../middleware/validate')
const { projectSchema } = require('../validators/schemas')

router.get('/', listProjects)
router.get('/:id', getProject)
router.post('/', auth, requireAdmin, validate(projectSchema), createProject)
router.put('/:id', auth, requireAdmin, validate(projectSchema), updateProject)
router.delete('/:id', auth, requireAdmin, deleteProject)

module.exports = router