const express = require('express');
const productController = require('../controllers/product-controller');
const ValidateAdmin= require('../middleware/ValidateAdmin')
const router = express.Router()

// Ruta para actualizar un producto. ad.
router.post('/',ValidateAdmin.njwtAuth,productController.updateAProduct);



module.exports = router; 