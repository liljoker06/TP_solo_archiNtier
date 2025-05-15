import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function AdminEvents() {
  const navigate = useNavigate()

  const events = [
    {
      id: 1,
      title: 'Concert Été',
      date: '2025-06-15',
      location: 'Paris',
      image: '/images/events/concert.jpg'
    },
    {
      id: 2,
      title: 'Conférence Tech',
      date: '2025-07-02',
      location: 'Lyon',
      image: '/images/events/tech.jpg'
    },
    {
      id: 3,
      title: 'Atelier Art',
      date: '2025-08-10',
      location: 'Marseille',
      image: '/images/events/art.jpg'
    }
  ]

  return (
    <div className="p-6 min-h-screen bg-black text-white mt-15">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Événements à venir</h1>
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
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-pink-500 transition"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{event.title}</h2>
              <p className="text-gray-400 text-sm mb-1">📅 {event.date}</p>
              <p className="text-gray-400 text-sm">📍 {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
