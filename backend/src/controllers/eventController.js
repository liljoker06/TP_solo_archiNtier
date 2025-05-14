import { createEvent, getAllEvents, getRemainingSeats } from '../models/eventModel.js'

//Créer un événement (admin uniquement)
export const createEventHandler = async (req, res) => {
  try {
    const { title, date, total_seats } = req.body

    if (!title || !date || !total_seats) {
      return res.status(400).json({ error: 'Champs requis : title, date, total_seats' })
    }

    const eventId = await createEvent(title, date, total_seats)

    res.status(201).json({
      message: 'Événement créé avec succès',
      eventId
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}

//Liste des événements (accessible à tous)
export const getAllEventsHandler = async (req, res) => {
  try {
    const events = await getAllEvents()

    // Optionnel : inclure le nombre de places restantes ?
    const eventsWithAvailability = await Promise.all(
      events.map(async (event) => {
        const remaining = await getRemainingSeats(event.id)
        return { ...event, remaining_seats: remaining }
      })
    )

    res.status(200).json(eventsWithAvailability)
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}
