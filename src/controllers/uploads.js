/////////////////////////////////////////////////////////////
// Importaciones

const res = require("express/lib/response");
const { subirArchivo } = require("../helpers");
const {Usuarios} = require('../models/usuario');
const {Productos} = require('../models/producto');





/////////////////////////////////////////////////////////////
// Funciones del Controlador

//1
const cargarArchivo = async (req,res) =>{
    
    console.log('POST /api/uploads');

    // #1 - Verificamos que venga un file
    if ( !req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

    // #2 - Verificamos que venga files con el nombre "archivo"
    if (!req.files.archivo ) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

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



    const nombre  = await subirArchivo(req.files,undefined, coleccion)
    modelo.img = nombre;
    await modelo.save();

    res.json({
        mgs:  'PUT /api/uploads/:coleccion/:id',
        modelo
    })


}


/////////////////////////////////////////////////////////////
// Exportaciones

module.exports = {
    cargarArchivo,
    actualizarImagen
}