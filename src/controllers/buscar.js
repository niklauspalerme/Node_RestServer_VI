/////////////////////////////////////////////////////////////
// Importaciones o Constantes

const { ObjectId } = require('mongoose').Types;
const { Categorias } = require('../models/categoria');
const { Productos } = require('../models/producto');
const { Usuarios } = require('../models/usuario');

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
]


/////////////////////////////////////////////////////////////
// Funciones


//#1
const buscarUsuarios = async (termino = '', res) =>{

    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId){
        const usuario = await Usuarios.findById(termino)
        return res.json({
           "msg": "GET /api/buscar/:coleccion/:termino",
           usuario
        })
    }

    const regex =  new RegExp(termino, 'i')

    const usuarios = await Usuarios.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]

    })

    return res.json({
        "msg": "GET /api/buscar/:coleccion/:termino",
        usuarios
     })

}


//#2
const buscarCategorias = async (termino = '', res) =>{


    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId){
        const categoria = await Categorias.findById(termino)
        return res.json({
           "msg": "GET /api/buscar/:coleccion/:termino",
           categoria
        })
    }

    const regex =  new RegExp(termino, 'i')

    const categorias = await Categorias.find({nombre: regex, estado: true})

    return res.json({
        "msg": "GET /api/buscar/:coleccion/:termino",
        categorias
     })

}


//#3
const buscarProductos = async (termino = '', res) =>{

    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId){
        const producto = await Productos.findById(termino)
        return res.json({
           "msg": "GET /api/buscar/:coleccion/:termino",
           producto
        })
    }

    const regex =  new RegExp(termino, 'i')

    const productos = await Productos.find({nombre: regex, estado: true}).populate('categoria', 'nombre');

    return res.json({
        "msg": "GET /api/buscar/:coleccion/:termino",
        productos
     })

}

/////////////////////////////////////////////////////////////
// Función Controlador de /api/buscar/:coleccion/:termino


const buscar = (req,res) => {

   try {

        console.log("GET /api/buscar/:coleccion/:termino")

        const {coleccion, termino} = req.params;

        console.log(coleccion);

        if (!coleccionesPermitidas.includes(coleccion))
            return  res.status(400).json({
                "msg": `The coleccion allowed are: ${coleccionesPermitidas}`
             })

        switch (coleccion) {
            case 'productos':
                buscarProductos(termino,res);
                break;
            case 'categorias':
                buscarCategorias(termino,res);
                break;
                        
            case 'usuarios':
                buscarUsuarios(termino, res);
                break;

            default:
                return res.status(500).json({
                    "msg": "Internal Server Error - Controllers/buscar"
                })
        }

       
   } catch (error) {
       console.log(error);
        res.status(500).json({
            "msg": error
        })
   }

}


/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
   buscar
}