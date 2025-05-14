import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerUser, findUserByEmail } from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

// ▶️ Inscription
export const registerHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nom, email et mot de passe requis' })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ error: 'Email déjà utilisé' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await registerUser(name, email, hashedPassword, role)

    res.status(201).json({ message: 'Inscription réussie', userId })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}


// Connexion avec génération de token JWT
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur introuvable' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }

    // Création du token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.status(200).json({
      message: 'Connexion réussie',
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message })
  }
}
