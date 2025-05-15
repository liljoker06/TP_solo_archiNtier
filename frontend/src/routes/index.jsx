import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './public'
import { privateRoutes } from './private'
import { adminRoutes } from './admin'
import RequireAuth from '../components/RequireAuth'

const AppRouter = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Routes privées (authentifié) */}
      {privateRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<RequireAuth>{element}</RequireAuth>}
        />
      ))}

      {/* Routes admin uniquement */}
      {adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<RequireAuth adminOnly>{element}</RequireAuth>}
        />
      ))}
    </Routes>
  )
}

export default AppRouter
