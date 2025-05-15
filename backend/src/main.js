import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db.js'
import logger from './utils/logger.js'
import { runSchema } from './utils/runSchema.js'

// Import des routes
import userRoutes from './routes/userRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'

dotenv.config()

const app = express()

import path from 'path'





// Middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.resolve('uploads')))

// Test DB connection
const connectDB = async () => {
  try {
    const connection = await db.getConnection()
    logger.info('✅ Connexion à MariaDB réussie')
    connection.release()
  } catch (error) {
    logger.error(`❌ Connexion à MariaDB échouée : ${error.message}`)
    process.exit(1)
  }
}
await connectDB()

await runSchema()

// Routes
app.use('/api/users', userRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/reservations', reservationRoutes)

// Ping route (optionnelle)
app.get('/', (req, res) => {
  logger.info('✔️ Route / ping appelée')
  res.send('🎉 Backend Reservation App is running!')
})

// Serveur
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`🚀 Serveur démarré sur http://localhost:${PORT}`)
})
