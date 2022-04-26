/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto, crearProducto } = require("../controllers/productos");
const { existeProducto, existeCategoria } = require("../helpers/db-validator");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.get('/', obtenerProductos);


router.get('/:id', [
    check('id', "The id is not a valid id. Please try agaian").isMongoId(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeProducto),
    validarCampos],
    obtenerProducto);


router.post('/', [
    validarJWT,
    check('nombre', 'The name is required').not().isEmpty(),
    check('categoria','The categoria is not a Mongo ID').isMongoId(),
    check('categoria', 'The id doesnt exits. Please try with another one').custom(existeCategoria),
    validarCampos],
    crearProducto);

    
router.put ('/:id',[
    validarJWT,
    check('id','The categoria is not a Mongo ID').isMongoId(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeProducto),
    validarCampos],
    actualizarProducto)


router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "The id is not a valid id. Please try agaian").isMongoId(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeProducto),
    validarCampos],
    borrarProducto)
    

/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router