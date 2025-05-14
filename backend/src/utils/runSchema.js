import fs from 'fs'
import path from 'path'
import db from '../config/db.js'
import logger from './logger.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const runSchema = async () => {
  try {
    const filePath = path.resolve(__dirname, '..', 'sql', 'schema.sql')
    const rawSql = fs.readFileSync(filePath, 'utf-8')

    // Séparer chaque instruction SQL (par ; suivi d’un retour à la ligne)
    const statements = rawSql
      .split(/;\s*[\r\n]+/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)

    for (const stmt of statements) {
      await db.query(stmt)
    }

    logger.info('📄 Le script schema.sql a été exécuté avec succès')
  } catch (error) {
    logger.error(`❌ Erreur lors de l’exécution de schema.sql : ${error.message}`)
  }
}
