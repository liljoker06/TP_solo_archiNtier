import db from '../config/db.js'

export const registerUser = async (name, email, hashedPassword, role = 'user') => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  )
  return result.insertId
}


export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
  return rows[0] // retourne l'utilisateur trouvé ou undefined
}
