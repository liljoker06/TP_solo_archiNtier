import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Events from '../pages/Events'
import Faq from '../pages/Faq'

export const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/events', element: <Events /> },
  { path: '/faq', element: <Faq /> },
]
