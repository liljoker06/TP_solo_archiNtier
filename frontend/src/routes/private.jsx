import Home from '../pages/Home'
import CreateEvent from '../pages/CreateEvent'
import MyReservations from '../pages/MyReservations'
import AdminReservations from '../pages/AdminReservations'

export const privateRoutes = [
  { path: '/', element: <Home /> },
  { path: '/create-event', element: <CreateEvent /> },
  { path: '/my-reservations', element: <MyReservations /> },
  { path: '/admin/reservations', element: <AdminReservations /> }
]
