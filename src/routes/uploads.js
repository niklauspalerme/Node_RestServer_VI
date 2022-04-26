/////////////////////////////////////////////////////////////
// Importaciones y Requeriments


const { Router } = require("express");
const { check } = require('express-validator');
const { cargarArchivo } = require("../controllers/uploads");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();


/////////////////////////////////////////////////////////////
// Implementación


router.post('/', cargarArchivo);



/////////////////////////////////////////////////////////////
// Exportamos

module.exports = router