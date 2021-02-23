const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnection = require("./config/dataBase");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//------RUTAS------
app.use("/post", require("./routes/posts"));
app.use('/auth', require('./routes/auth'));

//CONEXION A LA BASE DE DATOS
dbConnection();

app.listen(8000, () => console.log(`Servidor corriendo en el puerto 5000`));
