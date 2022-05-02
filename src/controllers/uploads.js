/////////////////////////////////////////////////////////////
// Importaciones

const path = require('path');
const fs = require('fs');
const res = require("express/lib/response");
const { subirArchivo } = require("../helpers");
const {Usuarios} = require('../models/usuario');
const {Productos} = require('../models/producto');





/////////////////////////////////////////////////////////////
// Funciones del Controlador

//1
const cargarArchivo = async (req,res) =>{
    
    console.log('POST /api/uploads');

    try {

        //Testing -> createParentPath --> const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'texto')
        const pathArchivo = await subirArchivo(req.files,undefined, 'imgs')

        res.json({
            msg: "POST /api/uploads",
            path: pathArchivo
        })
        
    } catch (msg) {

        res.status(400).json({msg})
        
    }


    
}


//2
const actualizarImagen = async  (req,res)=>{

    console.log('PUT /api/uploads/:coleccion/:id');

    const {id,coleccion}= req.params

    let modelo;

    switch (coleccion) {

        case 'usuarios':

            modelo = await  Usuarios.findById(id);

            if (!modelo){
                return  res.status(400).json({
                    msg: "There is not user with this ID"
                })
            }

            break;


        case 'productos':

            modelo = await  Productos.findById(id);

            if (!modelo){
                return  res.status(400).json({
                    msg: "There is not product with this ID"
                })
            }

        break;
    
        default:
            res.status(500).json({
                msg: "Internal Server Error"
            })
            break;
    }


   // Limpiar imágenes previas
   if ( modelo.img ) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
    if ( fs.existsSync( pathImagen ) ) {
        fs.unlinkSync( pathImagen );
    }
}

    //Actualizar img
    const nombre  = await subirArchivo(req.files,undefined, coleccion)
    modelo.img = nombre;
    await modelo.save();

    res.json({
        mgs:  'PUT /api/uploads/:coleccion/:id',
        modelo
    })


}


//3
const mostrarImagen = async (req,res) =>{

    console.log('GET /api/uploads/:coleccion/:id');

    const {id, coleccion} = req.params;

    let modelo;

    switch (coleccion) {

        case 'usuarios':

            modelo = await  Usuarios.findById(id);

            if (!modelo){
                return  res.status(400).json({
                    msg: "There is not user with this ID"
                })
            }

            break;


        case 'productos':

            modelo = await  Productos.findById(id);

            if (!modelo){
                return  res.status(400).json({
                    msg: "There is not product with this ID"
                })
            }

        break;
    
        default:
            res.status(500).json({
                msg: "Internal Server Error"
            })
            break;
    }


   // Limpiar imágenes previas
   if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile (pathImagen)
        }
    }

}


/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}