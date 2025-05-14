import db from '../config/db.js'

// réer un nouvel événement
export const createEvent = async (title, date, total_seats) => {
  const [result] = await db.query(
    'INSERT INTO events (title, date, total_seats) VALUES (?, ?, ?)',
    [title, date, total_seats]
  )
  return result.insertId
}

// Récupérer tous les événements
export const getAllEvents = async () => {
  const [rows] = await db.query('SELECT * FROM events ORDER BY date ASC')
  return rows
}

// Récupérer un événement par ID
export const getEventById = async (id) => {
  const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id])
  return rows[0]
}

// Récupérer le nombre de places restantes
export const getRemainingSeats = async (eventId) => {
  const [[event]] = await db.query(`
    SELECT 
      e.total_seats - IFNULL(SUM(r.quantity), 0) AS remaining
    FROM events e
    LEFT JOIN reservations r ON e.id = r.event_id
    WHERE e.id = ?
    GROUP BY e.id
  `, [eventId])

  return event?.remaining ?? 0
}
