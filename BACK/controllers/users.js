const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { generateError } = require('../helpers.js')

const { createUser, getUserById, getUserByEmail } = require('../DB/users.js')

const { getConnection } = require('../DB/DB.js')

const updateProfileController = async (req, res, next) => {
  let connection

  const pool = getConnection()

  try {
    console.log(req.userId) // salta el error establecido debido a que la comparacion estricta fuerza a introducir el mismo tipo de dato //

    const userId = req.params.id

    let { name, email, oldpassword, newpassword } = req.body
    if (!email || !oldpassword) {
      throw generateError('faltan datos para esta acción', 400)
    }
    if (+userId !== req.userId) {
      throw generateError('no tienes los permisos', 401)
    }
    console.log(newpassword)
    if (!newpassword) {
      newpassword = oldpassword
    }
    console.log(oldpassword)
    // Verificar si el usuario existe
    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      })
    }
    console.log(user)
    // compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(oldpassword, user.password)
    console.log(validPassword)
    if (!validPassword) {
      throw generateError('la contraseña no coincide', 401)
    }
    // Verificar si el nuevo email ya está en uso por otro usuario
    /* let existingUserWithEmail

    try {
      existingUserWithEmail = await getUserByEmail(email)
    } finally {
      if (existingUserWithEmail && existingUserWithEmail.id !== userId) {
        throw generateError('Ya existe un usuario con ese email', 409)
      }
    } */
    connection = await pool

    const [[existingUserWithEmail]] = await connection.query(
      'SELECT id FROM users WHERE email=?', [email])
    console.log(existingUserWithEmail)
    if (existingUserWithEmail && existingUserWithEmail.id !== +userId) {
      throw generateError('Ya existe un usuario con ese email', 409)
    }
    // Construir la actualización del perfil

    // Hashear la nueva contraseña (debe estar presente)

    const passwordHash = await bcrypt.hash(newpassword, 8)

    // Obtener una conexión del pool

    // Actualizar el perfil en la base de datos
    await connection.query('UPDATE users SET name= ?, email= ?, password=? WHERE id = ?', [name, email, passwordHash, userId])

    res.status(200).json({
      status: 'success',
      message: 'Perfil actualizado exitosamente'
    })
  } catch (error) {
    // Manejo de errores
    next(error)
  } finally {
    // Liberar la conexión de vuelta al pool, incluso si ocurrió un error
    if (connection) {
      connection.release()
    }
  }
}
// hasta aqui codigo de actualizacion de perfil

const newUserController = async (req, res, next) => {
  try {
    const { email, password, name } = req.body

    // esto deberia ser un join

    if (!email || !password) {
      throw generateError('debes introducir un email  y un password validos', 400)
    }
    const id = await createUser(email, password, name)
    console.log(id)

    res.status(201).send({
      status: 'OK',

      message: `user created with id: ${id}`
    })
    // comprobaciones y operaciones en el DB

    res.status(201).send({
      status: 'ok',
      message: 'Usuario creado correctamente'
    })
  } catch (error) {
    next(error)
  }
}

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getUserById(id)

    res.send({
      status: 'OK',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw generateError('debes enviar un email y una contraseña', 404)
    }
    // recojo datos de la base de datos del usuario con ese email
    const user = await getUserByEmail(email)

    // compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw generateError('la contraseña no coincide', 401)
    }
    // creo el payload del token

    const payload = { id: user.id }

    // firmo el token

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30d' })

    // envio el token
    res.send({
      status: 'OK',
      data: {
        idUser: user.id,
        name: user.name,
        email: user.email,
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newUserController,
  getUserController,
  loginController,
  updateProfileController

}
