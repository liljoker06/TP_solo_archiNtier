import express from 'express'
import { createEventHandler, getAllEventsHandler } from '../controllers/eventController.js'
import { checkAuth, checkAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Public : liste des événements
router.get('/', getAllEventsHandler)

// Admin uniquement : créer un événement
router.post('/', checkAuth, checkAdmin, createEventHandler)

export default router
