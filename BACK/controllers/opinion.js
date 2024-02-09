const { createOpinion, getAllOpinion, getOpinionById, deleteOpinionById, listOpinionbyUserId } = require('../DB/opinion')
const { generateError, createPathIfNotExists } = require('../helpers')
const path = require('path')
const sharp = require('sharp')
const { nanoid } = require('nanoid')

const listOpinionbyUserIdController = async (req, res, next) => {
  try {
    const { userId } = req.params
    const opinions = await listOpinionbyUserId(userId)
    res.send({
      status: 'ok',
      data: opinions
    })
  } catch (error) {
    next(error)
  }
}
const getOpinionController = async (req, res, next) => {
  try {
    const opinion = await getAllOpinion()
    res.send({
      status: 'OK',
      data: opinion
    })
  } catch (error) {
    next(error)
  }
}

const newOpinionController = async (req, res, next) => {
  // console.log('usuario', req.userId)

  try {
    const { text } = req.body

    if (!text || text.length > 280) {
      throw generateError('el texto de la opinion debe ser menor de 280 caracteres y existir', 400)
    }
    let imageFileName

    if (req.files && req.files.image) {
      // const  = '../uploads'
      /* path del directorio uploads */
      const uploadsDir = path.join(__dirname, '../uploads') /* no se ha creado la carpeta uploads xq */
      // console.log(uploadsDir)
      /* creo el directorio si no existe */
      await createPathIfNotExists(uploadsDir)
      console.log(uploadsDir)

      /* aqui procesamos la imagen */
      const image = sharp(req.files.image.data)
      image.resize(1000)
      /* guardo la imagen con un nombre aleatorio en el directorio uploads */
      imageFileName = `${nanoid(27)}.jpg`
      await image.toFile(path.join(uploadsDir, imageFileName))
    }

    const id = await createOpinion(req.userId, text, imageFileName)

    res.send({
      status: 'OK',
      message: `Opinion con id: ${id} creada correctamente`,
      id
    })
  } catch (error) {
    next(error)
  }
}

const getSingleOpinionController = async (req, res, next) => {
  try {
    const { id } = req.params
    const opinion = await getOpinionById(id)
    res.send({
      status: 'OK',
      data: opinion
    })
  } catch (error) {
    next(error)
  }
}
const deleteOpinionController = async (req, res, next) => {
  try {
    const { id } = req.params

    // conseguir la informacion de la opinion
    const opinion = await getOpinionById(id) // console.log(opinion)

    // comprobar que token y opinion pertenecen al mismo usuario
    if (req.userId !== opinion.userId) {
      throw generateError('No puedes borrar la opinion de otros usuarios', 401)
    }
    // borrar opinion
    await deleteOpinionById(id)

    res.send({
      status: 'OK',
      message: `Opinion con id: ${id}, borrado correctamente`
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getOpinionController,
  newOpinionController,
  getSingleOpinionController,
  deleteOpinionController,
  listOpinionbyUserIdController

}
