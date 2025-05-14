import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './public'
import { privateRoutes } from './private'

const AppRouter = () => (
  <Routes>
    {publicRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
    {privateRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
)

export default AppRouter
