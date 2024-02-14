const bcrypt = require('bcrypt')
const { generateError } = require('../helpers')
const { getConnection } = require('./DB')

const getUserByEmail = async (email) => {
  let connection
  try {
    connection = await getConnection()

    const [result] = await connection.query('SELECT * FROM users WHERE email = ?', [email])
    if (result.length === 0) {
      throw generateError('no hay usuarios con ese email', 404)
    }
    return result[0]
  } finally {
    if (connection) connection.release()
  }
}

const getUserById = async (id) => {
  let connection
  try {
    connection = await getConnection()

    const [result] = await connection.query('SELECT id, email,password, created_at FROM users WHERE id= ?', [id])
    if (result.length === 0) {
      throw generateError('no hay usuarios con esa id', 404)
    }
    return result[0]
  } finally {
    if (connection) connection.release()
  }
}

const createUser = async (email, password, name) => {
  let connection

  try {
    connection = await getConnection()

    // comprueba que no existe ningun otro usuario con ese email

    const [user] = await connection.query(
      'SELECT id FROM users WHERE email = ?', [email])
    if (user.length > 0) {
      throw generateError(
        'ya existe un usario en la base de datos con ese email', 409)
    }

    // encriptar la password
    const PasswordHash = await bcrypt.hash(password, 8)

    // crea el usuario
    const [newUser] = await connection.query('INSERT INTO users (email, password, name) Values(?, ?, ?)',
      [email, PasswordHash, name]
    )
    // devolver la id

    return newUser.insertId
  } finally { if (connection) connection.release() }
}

module.exports = { createUser, getUserById, getUserByEmail }
