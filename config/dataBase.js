const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
      await mongoose.connect(process.env.CONNECT_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log('Base de Datos online');
    } catch (error) {
      console.log(error.message);
      throw new Error("Error en la base de datos, vea logs");
    }
  };
  
  module.exports = dbConnection;
  