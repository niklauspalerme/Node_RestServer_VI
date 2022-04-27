/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.post('/', cargarArchivo);

router.put('/:coleccion/:id',[
    check('id', 'The id must be Mondo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c,  ['usuarios', 'productos'])),
    validarCampos],
    actualizarImagen)



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router