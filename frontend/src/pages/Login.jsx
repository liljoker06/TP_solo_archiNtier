import { useNavigate, Link } from 'react-router-dom'
import CanvasBackground from '../components/CanvasBackground'
import { useState } from 'react'
import { login } from '../services/authService' // ← service axios

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Veuillez remplir les champs")
      return
    }

    try {
      const { token, user } = await login(email, password)

      localStorage.setItem('isAuth', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion")
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <CanvasBackground />

      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="backdrop-blur-md bg-black/30 border border-white/10 p-8 rounded-xl shadow-lg w-[350px] max-w-full">
          <h1 className="text-3xl text-white font-bold text-center mb-4">ReservationApp</h1>
          <p className="text-gray-300 text-center mb-6">Connectez-vous pour accéder à votre espace</p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adresse e-mail"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full mb-6 px-4 py-2 rounded bg-gray-800 bg-opacity-60 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-semibold shadow-md hover:brightness-110 transition-all"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-pink-400 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
