import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'
import CanvasBackground from '../components/CanvasBackground'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.password) {
      setError("Tous les champs sont requis")
      return
    }

    try {
      const formData = { ...form, role: 'user' }
      await register(formData)
      setError('')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l’inscription')
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fond animé */}
      <CanvasBackground />

      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="backdrop-blur-md bg-black/30 border border-white/10 p-8 rounded-xl shadow-lg w-[350px] max-w-full">
          <h1 className="text-3xl text-white font-bold text-center mb-4">ReservationApp</h1>
          <p className="text-gray-300 text-center mb-6">Créez votre compte</p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nom complet"
              required
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Adresse e-mail"
              required
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              required
              className="w-full mb-6 px-4 py-2 rounded bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold shadow-md hover:brightness-110 transition-all"
            >
              S’inscrire
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-pink-400 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
