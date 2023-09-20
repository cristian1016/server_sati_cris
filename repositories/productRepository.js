// const mysql = require("mysql2");
// const Product = require("../models/product");

// //Configuración de la conexión a la base de datos MySQL
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "conexionTienda",
// });

// //Establecer la conexión a la base de datos
// connection.connect();

// class ProductRepository {
//   //Método privado para mapear una fila de resultados a un objeto Product
//   static mapRowToProduct(row) {
//     return new Product(row.id_pro, row.name_pro, row.descripcion, row.precio);
//   }

//   // Método para obtener todos los productos
//   static getAllProducts(callback) {
//     //Realiza una consulta SQL para seleccionar todos los productos en la tabla 'products'
//     connection.query("SELECT * FROM products", (error, results) => {
//       if (error) throw error;

//       //Mapea los resultados de la consulta a objetos de la clase Product
//       const products = results.map((row) => new Product (row.id_pro, row.name_pro, row.descripcion, row.precio));
//       //Llama a la función de devolución llamada (callback) con la lista de productos
//       callback(products);
//     });
//   }

//   //Método para obtener un producto por su ID
//   static getProductById(id, callback) {
//     //Realiza una consulta SQL para seleccionar un producto con el ID proporcionado
//     connection.query(
//       "SELECT * FROM products WHERE id_pro = ?",
//       [id],
//       (error, results) => {
//         if (error) throw error;

//         if (results.length > 0) {
//           //Si se encontró un producto, crea un objeto Product con los datos y llama a la función de devolución de llamada
//           const productData = results[0];
//           const product = ProductRepository.mapRowToProduct(productData);
//           callback(product);
//         } else {
//           //Si no se encontró un producto con el ID proporcionado, llama a la función de devolución de llamada con null
//           callback(null);
//         }
//       }
//     );
//   }

//   //Método para agregar un nuevo producto a la base de datos
//   static addProduct(product, callback) {
//     //Realiza una consulta SQL para insertar un nuevo producto en la tabla 'productos'
//     connection.query(
//       "INSERT INTO products (id_pro, name_pro, descripcion, precio) VALUES (?, ?, ?, ?)",
//       [product.id_pro, product.name_pro, product.descripcion, product.precio],
//       (error, results) => {
//         if (error) throw error;

//         //Obtiene el ID del nuevo producto insertado y llama a la función de devolución de llamada con ese ID
//         const newProductId = results.insertId;
//         callback(newProductId);
//       }
//     );
//   }

//   //Método para actualizar un producto en la base de datos
//   static updateProduct(product, callback) {
//     //Realiza una consulta SQL para actualizar el nombre y precio de un producto con el ID proporcionado
//     connection.query(
//       "UPDATE products SET name_pro = ?, descripcion = ?, precio = ? WHERE id_pro = ?",
//       [product.name_pro, product.descripcion, product.precio, product.id_pro],
//       (error) => {
//         if (error) throw error;

//         callback();
//       }
//     );
//   }

//   //Método para eliminar un producto de la base de datos
//   static deleteProduct(id_pro, callback) {
//     //Realiza una consulta SQL para eliminar un producto con el ID proporcionado
//     connection.query("DELETE FROM products WHERE id_pro = ?", [id_pro], (error) => {
//       if (error) throw error;

//       callback();
//     });
//   }
// }

// module.exports = ProductRepository;


const mysql = require("mysql2");
const Product = require("../models/product");


const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "conexionTienda",
});

connection.connect();

class ProductRepository {
  static getAllProducts(callback) {
    connection.query("SELECT * FROM products", (error, results) => {
      if (error) throw error;

      const products = results.map(
        (row) => new Product(row.id_pro, row.name_pro, row.descripcion, row.precio)
      );
      callback(products);
    });
  }

  static getProductById(id, callback) {
    connection.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
          const productData = results[0];
          const product = new Product(
            productData.id,
            productData.nombre,
            productData.precio
          );
          callback(product);
        } else {
          callback(null);
        }
      }
    );
  }

  static addProduct(product, callback) {
    connection.query(
      "INSERT INTO products (id_pro, name_pro, descripcion, precio) VALUES (?, ?, ?, ?)",
      [
        product.id_pro,
        product.name_pro,
        product.descripcion,
        product.precio,
      ],
      (error, results) => {
        if (error) throw error;

        const newProductId = results.insertId;
        callback(newProductId);
      }
    );
  }

  static updateProduct(product, callback) {
    connection.query(
      "UPDATE products SET name_pro = ?, precio = ? WHERE id_pro = ?",
      [product.name_pro, product.precio, product.id_pro],
      (error) => {
        if (error) throw error;

        callback();
      }
    );
  }

  static deleteProduct(id_pro, callback) {
    connection.query("DELETE FROM products WHERE id_pro = ?", [id_pro], (error) => {
      if (error) throw error;

      callback();
    });
  }
}

module.exports = ProductRepository;