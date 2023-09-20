const express = require('express');
const productController = require('../controllers/product-controller');
const router = express.Router();

//Para obtener la lista de productos.
router.get('/', productController.getProducts);

//getProduct: para manejar la lógica de obtener la lista de productos.
//manda la lista al cliente que hizo la solicitud.

module.exports = router; 