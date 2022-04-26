/////////////////////////////////////////////////////////////
// Importaciones


const { Schema, model } = require('mongoose');


/////////////////////////////////////////////////////////////
// Funciones

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

//Sobreescribimo el JSON de MongoDB del Schema
//Para que solo retornemos los campos necesarios
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;

    return user
}

const Usuarios = model('Usuario', UsuarioSchema);


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    Usuarios
}