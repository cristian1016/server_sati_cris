const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();
const ValidateAdmin = require('../middleware/ValidateAdmin')

//Ruta para eliminar un producto. ad.
router.delete('/', productController.deleteAProduct, ValidateAdmin.njwtAuth);


module.exports = router; 