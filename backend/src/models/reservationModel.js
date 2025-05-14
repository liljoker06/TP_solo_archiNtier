import db from '../config/db.js'

// Créer une réservation
export const createReservation = async (userId, eventId, quantity) => {
  const [result] = await db.query(
    'INSERT INTO reservations (user_id, event_id, quantity) VALUES (?, ?, ?)',
    [userId, eventId, quantity]
  )
  return result.insertId
}

// Obtenir le nombre de places restantes pour un événement
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

// Obtenir toutes les réservations d'un utilisateur
export const getReservationsByUser = async (userId) => {
  const [rows] = await db.query(`
    SELECT r.id, r.event_id, r.quantity, r.created_at, e.title, e.date
    FROM reservations r
    JOIN events e ON r.event_id = e.id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
  `, [userId])

  return rows
}

// Obtenir toutes les réservations pour un événement
export const getReservationsByEvent = async (eventId) => {
  const [rows] = await db.query(`
    SELECT r.id, r.user_id, u.name AS user_name, r.quantity, r.created_at
    FROM reservations r
    JOIN users u ON r.user_id = u.id
    WHERE r.event_id = ?
    ORDER BY r.created_at DESC
  `, [eventId])

  return rows
}


export const deleteReservationById = async (reservationId) => {
  const [result] = await db.query(
    'DELETE FROM reservations WHERE id = ?',
    [reservationId]
  )
  return result.affectedRows
}