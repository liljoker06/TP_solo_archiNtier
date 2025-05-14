import { createReservation, getRemainingSeats, getReservationsByUser, getReservationsByEvent, deleteReservationById } from '../models/reservationModel.js'

export const createReservationHandler = async (req, res) => {
  try {
    const { eventId, quantity } = req.body
    const userId = req.user?.id

    if (!eventId || !quantity || !userId) {
      return res.status(400).json({ error: 'Champs requis : eventId, quantity (auth nécessaire)' })
    }

    const remaining = await getRemainingSeats(eventId)

    if (quantity > remaining) {
      return res.status(400).json({ error: `Seulement ${remaining} place(s) disponible(s)` })
    }

    const reservationId = await createReservation(userId, eventId, quantity)

    res.status(201).json({ message: 'Réservation confirmée', reservationId })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}

// Liste des réservations d'un utilisateur (auth nécessaire)
export const getUserReservationsHandler = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ error: 'Non autorisé' })
    }

    const reservations = await getReservationsByUser(userId)

    res.status(200).json(reservations)
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}


// Liste des réservations pour un événement (auth nécessaire)
export const getReservationsByEventHandler = async (req, res) => {
  try {
    const eventId = req.params.id
    if (!eventId) {
      return res.status(400).json({ error: 'ID d’événement requis' })
    }

    const reservations = await getReservationsByEvent(eventId)
    res.status(200).json(reservations)
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}


// Supprimer une réservation (auth nécessaire)
export const deleteReservationHandler = async (req, res) => {
  try {
    const reservationId = req.params.id

    if (!reservationId) {
      return res.status(400).json({ error: 'ID de réservation requis' })
    }

    const deleted = await deleteReservationById(reservationId)

    if (deleted === 0) {
      return res.status(404).json({ error: 'Réservation non trouvée' })
    }

    res.status(200).json({ message: 'Réservation supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}