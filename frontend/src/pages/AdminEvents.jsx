import { useEffect, useState } from 'react'
import { Plus, Calendar, MapPin, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fetchEvents, deleteEvent } from '../services/eventService' 
import CanvasBackground from '../components/CanvasBackground'
import { toast } from 'react-toastify'

export default function AdminEvents() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data)
      } catch (err) {
        console.error('Erreur de chargement des événements :', err)
        toast.error("Erreur lors du chargement des événements")
      }
    }

    loadEvents()
  }, [])

  const handleDelete = async (eventId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return

    try {
      await deleteEvent(eventId)
      setEvents(events.filter(event => event.id !== eventId))
      toast.success("Événement supprimé")
    } catch (err) {
      console.error(err)
      toast.error("Erreur lors de la suppression")
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white p-6 mt-15">
      <CanvasBackground />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Événements</h1>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-event')}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-700 text-white px-4 py-2 rounded-full shadow hover:brightness-110 transition"
          >
            <Plus className="w-5 h-5 animate-pulse" />
            <span className="hidden sm:inline">Ajouter</span>
          </motion.button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-pink-500 transition relative"
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${event.img_url}`}
                alt={event.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>

              <button
                onClick={() => handleDelete(event.id)}
                className="absolute top-3 right-3 p-1 rounded-full bg-red-700 hover:bg-red-800 transition text-white"
                title="Supprimer l'événement"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
