import express from 'express'
import { registerHandler, loginHandler } from '../controllers/userController.js'

const router = express.Router()

//POST /api/users/register → Inscription
router.post('/register', registerHandler)

// POST /api/users/login → Connexion
router.post('/login', loginHandler)


export default router
