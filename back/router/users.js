const express = require('express')
const UserController = require('../controller/users')

//Configuración de express para generar rutas.
const api = express.Router()

//Rutas para llamadas HTTP
api.post('/sign-up', UserController.signUp)
api.get('/get-users', UserController.listUsers)

//Se exportan las rutas.
module.exports = api