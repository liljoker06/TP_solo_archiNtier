import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Stockage avec nom unique
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/events'
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = file.originalname.split('.')[0].replace(/\s+/g, '-')
    cb(null, `${Date.now()}-${name}${ext}`)
  }
})

export const upload = multer({ storage })
