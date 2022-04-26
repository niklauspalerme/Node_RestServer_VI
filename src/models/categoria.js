/////////////////////////////////////////////////////////////
// Importaciones


const { Schema, model } = require('mongoose');


/////////////////////////////////////////////////////////////
// Funciones

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

//Sobreescribimo el JSON de MongoDB del Schema
//Para que solo retornemos los campos necesarios
CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data} = this.toObject();

    return data
}

const Categorias = model('Categoria', CategoriaSchema);


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    Categorias
}