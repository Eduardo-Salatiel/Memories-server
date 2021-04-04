const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    img: String
});

usuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = mongoose.model('Usuario', usuarioSchema);