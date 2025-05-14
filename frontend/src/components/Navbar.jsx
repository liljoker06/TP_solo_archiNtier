import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()

  if (['/login', '/register'].includes(pathname)) return null

  return (
    <nav>
      <a href="/">Accueil</a>
      {/* autres liens */}
    </nav>
  )
}

export default Navbar
