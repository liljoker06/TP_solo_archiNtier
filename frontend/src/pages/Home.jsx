import { useEffect, useState } from 'react'
import { fetchEvents, getMyReservations, reserveEvent } from '../services/eventService'
import { toast } from 'react-toastify'
import CanvasBackground from '../components/CanvasBackground'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [myReservations, setMyReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchEvents()
        setEvents(eventsData)

        const cached = localStorage.getItem('myReservations')
        if (cached) {
          setMyReservations(JSON.parse(cached))
        } else {
          const reservations = await getMyReservations()
          const eventIds = reservations.map(r => r.event_id)
          setMyReservations(eventIds)
          localStorage.setItem('myReservations', JSON.stringify(eventIds))
        }
      } catch (error) {
        console.error('Erreur de chargement:', error)
        toast.error('Erreur lors du chargement des événements')
      }
    }

    fetchData()
  }, [])

  const handleReservation = async (eventId) => {
    if (myReservations.includes(eventId)) {
      toast.info('Vous avez déjà réservé cet événement')
      return
    }

    try {
      await reserveEvent(eventId)
      const updatedReservations = [...myReservations, eventId]
      setMyReservations(updatedReservations)
      localStorage.setItem('myReservations', JSON.stringify(updatedReservations))
      toast.success('Réservation réussie !')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur lors de la réservation')
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <CanvasBackground />

      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold mb-6">Événements</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-pink-500 transition"
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${event.img_url}`}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-400 text-sm">📍 {event.location}</p>
                <p className="text-gray-400 text-sm">📅 {event.date}</p>
                <p className="text-gray-400 text-sm">🪑 Places restantes : {event.remaining_seats}</p>

                {myReservations.includes(event.id) ? (
                  <p className="text-green-400 mt-2">Vous avez déjà réservé</p>
                ) : (
                  <button
                    onClick={() => handleReservation(event.id)}
                    className="mt-2 w-full py-2 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full hover:brightness-110 transition"
                  >
                    Réserver
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
