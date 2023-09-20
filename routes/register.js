const express = require('express');
const registerController = require('../controllers/register-controller');
const validatorRegister = require('../middleware/register-validator');
const router = express.Router();

//para registrar un nuevo usuario y validar los parámetros de la solicitud.
router.post('/', validatorRegister.validatorParams, validatorRegister.validator, registerController.register); 


//validator: para validar los datos del usuario
//register:  para llevar a cabo la lógica de registro del usuario.

module.exports = router;