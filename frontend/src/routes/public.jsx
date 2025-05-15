import Home from '../pages/Home'
import Faq from '../pages/Faq'
// import Reservation from '../pages/Reservation'
import Login from '../pages/Login'
import Register from '../pages/Register'

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/faq', element: <Faq /> },
  // { path: '/reservation', element: <Reservation /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> }
]
