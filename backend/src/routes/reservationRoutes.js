import express from 'express'
import {
  createReservationHandler,
  getUserReservationsHandler,
  getReservationsByEventHandler,
  deleteReservationHandler
} from '../controllers/reservationController.js'

import { checkAuth, checkAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Créer une réservation (utilisateur authentifié)
router.post('/', checkAuth, createReservationHandler)

// Voir mes réservations (utilisateur authentifié)
router.get('/', checkAuth, getUserReservationsHandler)

// Voir les réservations d'un événement (public)
router.get('/event/:id', getReservationsByEventHandler)

// Supprimer une réservation (utilisateur authentifié)
router.delete('/:id', checkAuth, checkAdmin, deleteReservationHandler)

export default router
