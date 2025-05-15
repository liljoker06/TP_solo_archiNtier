import { useEffect, useState } from 'react'
import { Plus, Calendar, MapPin} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { fetchEvents } from '../services/eventService'

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
            }
        }

        loadEvents()
    }, [])

    return (
        <div className="p-6 min-h-screen bg-black text-white mt-15">
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
                        className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-pink-500 transition"
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
                    </div>
                ))}
            </div>
        </div>
    )
}
