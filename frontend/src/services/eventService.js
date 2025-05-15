import axiosInstance from './axiosInstance'

// Créer un événement
export const createEvent = async (formData) => {
  const response = await axiosInstance.post('/events/', formData)
  return response.data
}

// Récupérer tous les événements
export const fetchEvents = async () => {
  const response = await axiosInstance.get('/events/')
  return response.data
}

// Réserver un événement
export const reserveEvent = async (eventId) => {
  const response = await axiosInstance.post('/reservations', {
    event_id: eventId,
    quantity: 1
  })
  return response.data
}

// Récupérer les réservations de l'utilisateur
export const getMyReservations = async () => {
  const response = await axiosInstance.get('/reservations')
  return response.data
}


//supprime une réservation
export const deleteEvent = async (eventId) => {
  const response = await axiosInstance.delete(`/events/${eventId}`)
  return response.data
}