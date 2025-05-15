import CreateEvent from '../pages/CreateEvent'
import AdminReservations from '../pages/AdminReservations'
// import AdminUsers from '../pages/AdminUsers' // optionnel
import AdminEvents from '../pages/AdminEvents'

export const adminRoutes = [
  { path: '/create-event', element: <CreateEvent /> },
  { path: '/admin/reservations', element: <AdminReservations /> },
  {path: '/admin/events', element: <AdminEvents/>},
  // { path: '/admin/users', element: <AdminUsers /> }
]
