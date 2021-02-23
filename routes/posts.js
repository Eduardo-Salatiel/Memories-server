//------------------------------------------------
//          PATH: /post
//------------------------------------------------
const express = require('express');
const app = express.Router();
const postController = require('./../controllers/postController');

app.get('/', postController.getPosts);
app.post('/', postController.createPost)

module.exports = app;