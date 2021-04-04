const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("./config/dataBase");
const fileUpload = require('express-fileupload');
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//Manejo de archivos
app.use(fileUpload());

//SERVIR CONTENIDO ESTATICO
app.use('/public', express.static(`${__dirname}/db/img`));

//------RUTAS------
app.use("/post", require("./routes/posts"));
app.use('/auth', require('./routes/auth'));



//CONEXION A LA BASE DE DATOS
dbConnection();

app.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));
