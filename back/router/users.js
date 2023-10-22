const express = require('express')
const UserController = require('../controller/users')
const middleWare = require('../middleware/authentication')

//Configuración de express para generar rutas.
const api = express.Router()

//Rutas para llamadas HTTP
api.post('/create-user', [middleWare.validateToken], UserController.createUser)
api.get('/list-users', [middleWare.validateToken], UserController.listRelatedUsers)
api.post('/sign-in', UserController.signIn)
api.post('/sign-up', UserController.signUp)
//api.get('/get-users', UserController.listUsers)

//Se exportan las rutas.
module.exports = api