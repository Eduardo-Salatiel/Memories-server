//---------------------------
//       PATH: /auth/
//---------------------------
const express = require('express');
const app = express.Router();
const authController = require('./../controllers/authController');
const { validarLogin, validarRegistro } = require('../middleware/validation/authValidations');
const verificarJWT = require('../middleware/verificaJWT');

//REGISTRAR USUARIO
app.post('/register',validarRegistro, authController.registrarUsuario);
app.post('/login', validarLogin ,authController.autenticarUsuario);
app.post('/renew', verificarJWT ,authController.renewToken)


module.exports = app;