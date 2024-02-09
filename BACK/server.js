require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cors = require('cors');

const {
  newUserController,
  getUserController,
  loginController,
  updateProfileController

} = require('./controllers/users.js')
const {
  getOpinionController,
  newOpinionController,
  getSingleOpinionController,
  deleteOpinionController,
  listOpinionbyUserIdController
} = require('./controllers/opinion.js')

const { authUser } = require('./middlewares/auth.js')

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(fileUpload())

app.use(express.json())

app.use(morgan('dev'))

app.use('/uploads', express.static('./uploads'))

/* rutas para control actividad de los usuarios */

app.post('/user', newUserController)
app.get('/user/:id', getUserController) // accedder a opiniones de otros usuarios
app.post('/login', loginController)
app.put('/user/:id', authUser, updateProfileController)
/* rutas de control de opiniones */

app.get('/', getOpinionController)
app.post('/opinion', authUser, newOpinionController)
app.get('/opinion/:id', authUser, getSingleOpinionController)
app.delete('/opinion/:id', authUser, deleteOpinionController)
//app.get('/users/:userId/opinion', listOpinionbyUserIdController)

/* controlador de errores */

app.use((error, req, res, next) => {
  console.error(error)

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message
  })
})

/* ponemos a escuchar el servidor */

app.listen(PORT, () => {
  console.log(`Servidor escuchando (http://localhost:${PORT})`)
}

)
