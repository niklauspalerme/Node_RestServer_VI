/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete, usuarioPath } = require("../controllers/usuarios");
const { esRoleValido, validarEmailRepetido, existeUsuarioPorID } = require("../helpers/db-validator");
const {validarCampos,validarJWT, esAdminRole, tieneRol} = require('../middlewares');
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.get('/', usuarioGet);

router.post('/',[
    check('nombre', 'The name is empty').not().isEmpty(),
    check('correo', 'The email is invalid').isEmail(),
    check('correo').custom(validarEmailRepetido),
    check('password', 'The password must be more 6 characters').isLength({ min: 6 }),
    check('rol').custom(esRoleValido),
    validarCampos],
    usuarioPost);

router.put('/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRoleValido),
    validarCampos],
    usuarioPut);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos],
    usuarioDelete);

router.patch('/', usuarioPath);



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router