const jwt = require('jsonwebtoken') // borro el require //

const { generateError } = require('../helpers')

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 401)
    }
    let token

    try {
      token = jwt.verify(authorization, process.env.SECRET)
      req.user = token.id
    } catch {
      throw generateError('Token incorrecto', 401)
    }
    // console.log(token)
    req.userId = token.id

    next()
  } catch (error) {
    next(error)
  }
}
module.exports = {
  authUser
}
