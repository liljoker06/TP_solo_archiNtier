import express from 'express'
import { createEventHandler, getAllEventsHandler } from '../controllers/eventController.js'
import { checkAuth, checkAdmin } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'

const router = express.Router()

// Public : liste des événements
router.get('/', getAllEventsHandler)

// Admin uniquement : créer un événement (avec upload image)
router.post('/', checkAuth, checkAdmin, upload.single('image'), createEventHandler)

export default router
