import { useEffect, useState } from 'react'
import { getMyReservations } from '../services/eventService'
import { useNavigate } from 'react-router-dom'
import CanvasBackground from '../components/CanvasBackground'

export default function MyReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const isAuth = localStorage.getItem('isAuth') === 'true'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getMyReservations()
        setReservations(data)
      } catch (error) {
        console.error('Erreur lors du chargement des réservations :', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuth) fetchReservations()
    else setLoading(false)
  }, [isAuth])

  if (!isAuth) {
    return (
      <div className="relative w-full h-screen bg-black text-white overflow-hidden">
        <CanvasBackground />
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <p className="text-xl">Veuillez vous connecter pour voir vos réservations.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-gradient-to-r from-pink-600 to-purple-700 text-white px-4 py-2 rounded-full"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <CanvasBackground />

      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold mb-6">Mes réservations</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : reservations.length === 0 ? (
          <p>Vous n'avez encore effectué aucune réservation.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {reservations.map((r) => (
              <div key={r.id} className="bg-black p-4 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold">{r.title}</h2>
                <p className="text-gray-400 text-sm">📍 {r.location}</p>
                <p className="text-gray-400 text-sm">📅 {r.date}</p>
                <p className="text-gray-400 text-sm">🎟️ Quantité : {r.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
