const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("./../models/usuario");
const generarToken = require("../utils/jwt");

exports.registrarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });
    //VALIDA SI EL CORREO EXISTE EN EL SISTEMA
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        error: "El correo electronico ya existe",
      });
    }
    //REGISTRO DEL USUARIO
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await nuevoUsuario.save();
    const token = await generarToken(nuevoUsuario.id);

    return res.status(201).json({
      ok: true,
      usuario: nuevoUsuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
      error: error.message,
    });
  }
};

exports.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    //COMPRUEBA QUE ExiSTA EL EMAIL
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });
    }

    //VERIFICA LA CONTRASEÑA
    const verificaPassword = bcrypt.compareSync(password, usuario.password);
    if (!verificaPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });
    }

    //TODO OK, ENVIAR USUARIO Y TOKEN
    const token = await generarToken(usuario.id);
    return res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: "Error interno del servidor",
      error: error.message,
    });
  }
};
