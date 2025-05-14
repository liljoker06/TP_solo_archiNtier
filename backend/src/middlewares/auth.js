import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET 

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou invalide' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded // on attache les infos de l'utilisateur à la requête
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Token invalide ou expiré' })
  }
}

export const checkAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Accès réservé aux administrateurs' })
  }
  next()
}
