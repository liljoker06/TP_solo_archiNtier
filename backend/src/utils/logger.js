import winston from 'winston'
import path from 'path'
import fs from 'fs'

// Création du dossier logs s'il n'existe pas
const logDir = path.join('logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'app.log') })
  ]
})

export default logger
