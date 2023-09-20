const express = require('express');
const authController = require('../controllers/auth-controller');
const AuthToken = require('../middleware/auth-token');
const router = express.Router();


//autenticación JWT.
router.post('/', AuthToken.njwtAuth);

//se encarga de verificar la validez del token JWT proporcionado en la
//solicitud antes de permitir que se procese la solicitud en el controlador correspondiente.


module.exports = router; 