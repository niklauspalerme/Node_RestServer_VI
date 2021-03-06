/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarArchivoUpload, validarCampos } = require("../middlewares");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.post('/',
    validarArchivoUpload,
    cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoUpload,
    check('id', 'The id must be Mondo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c,  ['usuarios', 'productos'])),
    validarCampos],
    //actualizarImagen
    actualizarImagenCloudinary)

 router.get('/:coleccion/:id',[
    check('id', 'The id must be Mondo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c,  ['usuarios', 'productos'])),
    validarCampos],
    mostrarImagen)



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router