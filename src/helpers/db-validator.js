/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Categorias } = require("../models/categoria");
const { Productos } = require("../models/producto");
const { Roles } = require("../models/role");
const { Usuarios } = require('../models/usuario');



/////////////////////////////////////////////////////////////
// Funciones


//#1
const esRoleValido = async(rol = '') => {
    const exisRol = await Roles.findOne({ rol });

    if (!exisRol) {
        throw new Error(`The rol ${rol}, it doesnt exist on the DB`);
    }

    return true;
}


//#2
const validarEmailRepetido = async(correo = '') => {


    const existEmail = await Usuarios.findOne({ correo });
    if (existEmail) {
        throw new Error("The email exist. Please try with another one");
    }

    return true;
}


//#3
const existeUsuarioPorID = async (id) => {

    const existID = await Usuarios.findById(id);
    if (!existID) {
        throw new Error("The id doesn't exist. Please try with another one");
    }

    return true;

}


//#4
const existeCategoria = async (id) =>{

    const existeCategoria = await Categorias.findById(id);

    if (!existeCategoria) {
        throw new Error("The id doesn't exist. Please try with another one");
    }

    return true;

}


//#5

const existeProducto = async (id) =>{

    const existeProducto = await Productos.findById(id)

    if (!existeProducto)
        throw new Error ('The id doesnt exist. Please try with another one.');


    return true;
}


//6
const  coleccionesPermitidas = (coleccion= '', colecciones = []) =>{

    if (!colecciones.includes(coleccion))
        throw new Error ('The coleccion is not allowed');

    return true;
}





/////////////////////////////////////////////////////////////
// Exportamos

module.exports = {
    esRoleValido,
    validarEmailRepetido,
    existeUsuarioPorID,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}