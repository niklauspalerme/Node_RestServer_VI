/////////////////////////////////////////////////////////////
// Importaciones


const { Schema, model } = require('mongoose');


/////////////////////////////////////////////////////////////
// Funciones

const RolSchema = Schema({

    rol: {

        type: String,
        require: [true, "The rol is required"]
    }

})

const Roles = model('Role', RolSchema)


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    Roles
}