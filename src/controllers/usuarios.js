/////////////////////////////////////////////////////////////
// Importaciones

const { response, request } = require('express');
const { Usuarios } = require('../models/usuario');
const bcryptjs = require('bcryptjs');



/////////////////////////////////////////////////////////////
// Funciones Controllers de Usuario



//GET /api/usuarios
const usuarioGet = async (req = request, res = response) => {

    console.log("GET /api/usuarios");


    const { page = '0', limit = '5', to = 0 , estado = true} = req.query

    //Opction #1
    //Ejecutas una promesa y debe esperar que una termine para que se ejecute la otra
    
    /*
    const usuarios = await Usuarios.find({estado}).skip(to).limit(limit);
    const total = await Usuarios.countDocuments({estado}); // Total de registro en Mongo DB
    */

    //Option #2
    //ejecutamos las promesas al mismo tiempo y esperemoas a que ambas finalicen 
    const [total,usuarios] = await Promise.all([
        Usuarios.countDocuments({estado}),
        Usuarios.find({estado}).skip(to).limit(limit)

    ])

    res.status(200).json({
        "Message": "GET /api/usuarios",
        total,
        usuarios
    });
}


//POST /api/usuarios
const usuarioPost = async(req, res) => {

    console.log("POST /api/usuarios");


    const { nombre, correo, password, rol } = req.body
    const usuarioObj = {
        nombre,
        correo,
        password,
        rol
    }


    //Encrypt
    const salt = bcryptjs.genSaltSync();
    usuarioObj.password = bcryptjs.hashSync(password, salt);

    const usuario = new Usuarios(usuarioObj);
    await usuario.save();

    res.status(201).json({
        "Message": "POST /usuarios",
        usuario
    });
}


//PUT /api/usuarios/:id
const usuarioPut = async(req = request, res) => {

    console.log("PUT /api/usuarios/:id");

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        //Encrypt
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuarios.findByIdAndUpdate(id, resto)


    res.status(200).json({
        "Message": "Put Mil Fleurs",
        usuarioDB
    });
}


//DELETE /api/usuarios
const usuarioDelete = async (req, res) => {

    console.log("DELETE /api/usuarios/:id")

    const {id}= req.params;
    const usuarioAutenticado = req.usuario;

    // #1 - Eliminar fisicamente el record
    //const usuario = await Usuarios.findByIdAndDelete(id);

    // #2 - Cambiamos el estado = false
    //Es para mantener la integridad de los datos


    const usuario = await Usuarios.findByIdAndUpdate(id, {estado: false});

   return  res.status(200).json({ 
        "Message": "DELETE /api/usuarios",
        usuario,
        usuarioAutenticado
    });
}




const usuarioPath = (req, res) => {
    res.json({ 
        "Message": "DELETE /api/usuarios"    });
}


/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPath
}