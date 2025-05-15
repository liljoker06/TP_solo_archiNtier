import express from 'express'
import { registerHandler, loginHandler, checkUserRole } from '../controllers/userController.js'
import { checkAuth } from '../middlewares/auth.js'

const router = express.Router()

//POST /api/users/register → Inscription
router.post('/register', registerHandler)

// POST /api/users/login → Connexion
router.post('/login', loginHandler)

// GET /api/users/check-role → Vérification du rôle de l'utilisateur
router.get('/check', checkAuth, checkUserRole)

export default router
