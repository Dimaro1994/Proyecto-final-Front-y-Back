const { generateError } = require('../helpers')
const { pool } = require('./DB')

const deleteOpinionById = (id) => {
  return pool.query(
    'DELETE FROM opinion WHERE id=?',
    [id]
  )
}

const getOpinionById = async (id) => {
  const [result] = await pool.query(
    'SELECT * FROM opinion WHERE id=?',
    [id]
  )
  if (result.length === 0) {
    throw generateError(`La opinion con id: ${id} no existe`, 404)
  }
  return result[0]
}

const PAGE_SIZE = 20

const getAllOpinion = async (pageIndex) => {
  if (pageIndex === undefined) {
    const [result] = await pool.query('SELECT * FROM opinion ORDER BY created_at DESC')
    return result
  }
  const startIndex = pageIndex * PAGE_SIZE // paginación
  const [result] = await pool.query(
    'SELECT * FROM opinion ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [PAGE_SIZE, startIndex]
  )
  return result
}

const createOpinion = async (userId, text, image = '') => {
  const [result] = await pool.query(
    `INSERT INTO opinion (users_id, text, image)
    VALUES(?, ?, ?) `, [userId, text, image])
  return result.insertId
}

const listOpinionbyUserId = async (userId) => {
  const [result] = await pool.query('SELECT * FROM opinion WHERE user_id = ? ORDER BY created_at DESC', [userId])

  if (result.length === 0) {
    throw generateError(`No hay opiniones para el usuario con id: ${userId}`, 404)
  }
  return result
}

module.exports = {
  createOpinion,
  getAllOpinion,
  getOpinionById,
  deleteOpinionById,
  listOpinionbyUserId

}
