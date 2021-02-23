//---------------------------
//       PATH: /auth/
//---------------------------
const express = require('express');
const app = express.Router();
const Usuario = require('./../models/usuario');
const authController = require('./../controllers/authController');

//REGISTRAR USUARIO
app.post('/register', authController.registrarUsuario);
app.post('/login', authController.autenticarUsuario);


module.exports = app;