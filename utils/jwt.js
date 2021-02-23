const JWT = require("jsonwebtoken");

const generarToken = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {uid};
    JWT.sign(
      payload,
      process.env.SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};


module.exports = generarToken;