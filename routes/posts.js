//------------------------------------------------
//          PATH: /post
//------------------------------------------------
const express = require('express');
const app = express.Router();
const postController = require('./../controllers/postController');

const verificarJWT = require('./../middleware/verificaJWT');

app.get('/get-post', postController.getPosts);
app.get('/get-user-post', postController.getUserPost)
app.post('/new-post', verificarJWT, postController.createPost)

module.exports = app;