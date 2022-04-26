/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { login, googleSignin } = require("../controllers/authentication");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.post('/login',[
    check('correo', 'The email is required').isEmail(),
    check('password', "The password is required").not().isEmpty(),
    validarCampos],
    login)

router.post('/google',[
        check('id_token', "The id_token is required").not().isEmpty(),
        validarCampos],
        googleSignin)


/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router