const JWT = require("jsonwebtoken");

const verificarJWT = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        ok: false,
        error: "Petición sin token",
      });
    }
    const payload = JWT.verify(token, process.env.SEED);
    req.id = payload.uid;
    next();
  } catch (error) {
    return res.status(401).json({
        ok: false,
        error: "Token no valido",
      });
  }
};

module.exports = verificarJWT;
