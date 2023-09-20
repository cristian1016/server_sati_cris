const express = require('express');
const authController = require('../controllers/auth-controller');
const validatorAuth = require('../middleware/auth-validator');
const router = express.Router();

// Ruta para autenticar un usuario y validar los parámetros de la solicitud.
router.post('/', validatorAuth.validatorParams, validatorAuth.validator, authController.auth);

//contiene todos los campos necesarios para la autenticación (email y contraseña).


//validator: Otro middleware se utiliza para validar los datos del usuario, 


module.exports = router; 