const ProductRepository = require("../repositories/productRepository");
const UserRepository = require("../repositories/userRepository");
const sendMail = require('../repositories/sendMail');
const ValidateAdmin = require('../middleware/ValidateAdmin');
const Product = require("../models/product");

// Middleware para verificar el administrador
const checkAdmin = (req, res, next) => {
  ValidateAdmin.njwtAuth(req, res, next);
};

// Función para manejar errores
const handleResponse = (res, message) => {
  return (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message });
    }
  };
};

// Obtiene todos los productos y los devuelve como respuesta en formato JSON
const getProducts = (req, res) => {
  ProductRepository.getAllProducts((Product)=> {res.status(200).json(Product)});
};

// Agrega un producto utilizando los datos proporcionados en el cuerpo de la solicitud y responde con un mensaje de éxito
const addProduct = (req, res) => {
  // ValidateAdmin.njwtAuth(req,res,null)
  ProductRepository.addProduct(req.body, handleResponse(res, "Producto registrado correctamente"));
};

// Actualiza un producto utilizando los datos proporcionados en el cuerpo de la solicitud y responde con un mensaje de éxito
const updateAProduct = (req, res) => {
  // ValidateAdmin.njwtAuth(req,res,null)
  ProductRepository.updateProduct(req.body, handleResponse(res, "Producto actualizado correctamente"));
};

// Elimina un producto utilizando el ID proporcionado en la consulta y responde con un mensaje de éxito
const deleteAProduct = (req, res) => {
  ProductRepository.deleteProduct(req.query.id_pro, handleResponse(res, "Producto eliminado correctamente"));
};

// Realiza una compra de producto para un usuario y responde con un mensaje de éxito
const comprarProducto = (req, res) => {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;
  const cantidad = req.body.cantidad;

  UserRepository.comprarProducto(user_id, product_id, cantidad, () => {
    const asuntoCorreo = 'Compra realizada';
    const contenidoCorreo = 'Gracias por comprar en mercado campesino col';

    // sendMail.enviarCorreo(user_id, asuntoCorreo, contenidoCorreo);

    res.status(200).json({ message: "Compra realizada con éxito" });
  });
};

module.exports = {
  getProducts,
  addProduct,
  updateAProduct,
  deleteAProduct,
  comprarProducto,
  checkAdmin, // Exporta el middleware de verificación de administrador si es necesario en otros lugares.
};
