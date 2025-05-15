import { createEvent, getAllEvents, getRemainingSeats, updateEventImage  } from '../models/eventModel.js'
import fs from 'fs'
import path from 'path'


//Créer un événement (admin uniquement)
export const createEventHandler = async (req, res) => {
  try {
    const { title, date, location, total_seats } = req.body
    const file = req.file

    if (!title || !date || !location || !total_seats || !file) {
      return res.status(400).json({ error: 'Champs requis : title, date, location, total_seats, image' })
    }

    //Créer l'événement sans image
    const eventId = await createEvent(title, date, location, total_seats)

    //Créer le dossier /uploads/events/:id
    const folderPath = `uploads/events/${eventId}`
    fs.mkdirSync(folderPath, { recursive: true })

    //Déplacer le fichier dans le dossier
    const ext = path.extname(file.originalname)
    const filename = `event${ext}`
    const newPath = `${folderPath}/${filename}`

    fs.renameSync(file.path, newPath)

    const img_url = `/uploads/events/${eventId}/${filename}`

    //Mettre à jour le champ img_url dans la DB
    await updateEventImage(eventId, img_url)

    res.status(201).json({
      message: 'Événement créé avec succès',
      eventId,
      img_url
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}


//Liste des événements (accessible à tous)
export const getAllEventsHandler = async (req, res) => {
  try {
    const events = await getAllEvents()

    
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
