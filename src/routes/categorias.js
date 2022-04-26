/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validator");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación

router.get('/',obtenerCategorias)

router.get('/:id', [
    check('id', "The id is not a valid id. Please try agaian").isMongoId(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeCategoria),
    validarCampos],
    obtenerCategoria);


router.post('/', [
    validarJWT,
    check('nombre', 'The name is required').not().isEmpty(),
    validarCampos],
    crearCategoria);


router.put('/:id',[
    validarJWT,
    check('nombre', "The nombre is mandatory").not().isEmpty(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeCategoria),
    validarCampos],
    actualizarCategoria);


router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "The id is not a valid id. Please try agaian").isMongoId(),
    check('id', 'The id doesnt exits. Please try with another one').custom(existeCategoria),
    validarCampos],
    borrarCategoria)



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router