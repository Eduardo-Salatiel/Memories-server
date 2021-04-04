const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema({
    title: String,
    message: String,
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});


module.exports = mongoose.model('Post', postSchema);