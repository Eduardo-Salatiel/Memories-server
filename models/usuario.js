const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = Schema({
    id: String,
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: String
});

usuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = mongoose.model('Usuario', usuarioSchema);