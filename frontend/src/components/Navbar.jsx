import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { getUserRole } from '../services/authService'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()
  const isAuth = localStorage.getItem('isAuth') === 'true'

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuth) return

      try {
        const data = await getUserRole()
        setUser(data)
        setIsAdmin(data.role === 'admin')
        localStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
        console.error("Erreur lors de la vérification du rôle :", error)
        localStorage.clear()
        navigate('/login')
      }
    }

    fetchUser()
  }, [isAuth, navigate])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    setIsAdmin(false)
    navigate('/login')
  }

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Réservations', path: '/my-reservations' },
    { name: 'FAQ', path: '/faq' },
  ]

  const adminItems = [
    { name: 'Gérer les événements', path: '/admin/events' },
  ]

  const linkClasses = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-gradient-to-r from-pink-500 to-purple-500 pb-1 block'
      : 'text-white hover:text-pink-400 transition duration-300 block'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <nav className={`bg-black text-white px-4 md:px-8 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 border-b border-gray-700 transition-transform duration-500 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Burger menu */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(true)} className="text-white">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Logo */}
      <div className="text-2xl font-bold md:mx-0 mx-auto">ReservationApp</div>

      {/* Desktop nav */}
      <div className="hidden md:flex space-x-6 ml-8 absolute left-1/2 transform -translate-x-1/2">
        {[...navItems, ...(isAdmin ? adminItems : [])].map((item) => (
          <NavLink key={item.name} to={item.path} className={linkClasses}>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Auth section */}
      <div className="hidden md:flex items-center space-x-4">
        {!isAuth || !user ? (
          <>
            <NavLink to="/login" className="text-gray-300 hover:text-white text-sm">Connexion</NavLink>
            <NavLink to="/register">
              <button className="bg-gradient-to-r from-pink-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm shadow hover:opacity-90 transition">
                Inscription
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300">Bonjour {user?.name || user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-500 transition"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>

      {/* Overlay mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 transition-opacity duration-300" />
      )}

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-full bg-black text-white z-50 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <span className="text-xl font-bold">ReservationApp</span>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col space-y-4 px-4 py-6">
          {[...navItems, ...(isAdmin ? adminItems : [])].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          {!isAuth || !user ? (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-gray-300">
                Connexion
              </NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                <button className="bg-gradient-to-r from-pink-500 to-purple-700 text-white w-full py-3 rounded-full font-medium shadow-lg hover:opacity-90 transition duration-300 text-center">
                  Inscription
                </button>
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false)
                handleLogout()
              }}
              className="text-red-400 hover:text-red-500 text-left text-sm"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
