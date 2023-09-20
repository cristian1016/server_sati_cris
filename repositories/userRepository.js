const mysql = require("mysql2");
const User = require("../models/user");

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "conexionTienda",
});
db.connect();


class UserRepository {
  // Método para agregar un nuevo usuario a la base de datos
  static addUser(id_user, email, name_user, lastName, password, rol, callback) {
    // Consulta SQL para insertar un nuevo usuario en la tabla 'usuarios'

    if (id_user == null || email == null || name_user == null || lastName == null || password == null || rol == null) {
      callback(false);
      return;
    }

    const query =
      "INSERT INTO users (id_user, email, name_user, lastName, password, rol) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [id_user, email, name_user, lastName, password, rol], (err, result) => {
      if (err) {
        // Maneja errores al registrar el usuario
        console.error("Error al registrar el usuario: " + err.message);
        callback(false);
      } else {
        // Registro de éxito al registrar el usuario
        console.log("Usuario registrado con éxito");
        callback(true);
      }
    });
  }

  // Método para registrar una compra de un producto por un usuario
  static comprarProducto(user_id, product_id, cantidad, callback) {
    // Consulta SQL para registrar una compra en la tabla 'compras'
    const query =
      "INSERT INTO compra (user_id, product_id, cantidad) VALUES (?, ?, ?)";
    db.query(query, [user_id, product_id, cantidad], (err, result) => {
      if (err) {
        // Maneja errores al registrar la compra
        console.error("Error al registrar la compra: " + err.message);
        callback(false);
      } else {
        // Registro de éxito al registrar la compra
        console.log("Compra realizada con éxito");
        callback(true);
      }
    });
  }

  //Método para obtener la información de un usuario por su ID
  static obtenerInformacionUsuario(user_id, callback) {

    const query = 'SELECT * FROM users WHERE id_user = ?';
    db.query(query, [user_id], (err, result) => {
      if (err) {
        //Maneja errores al obtener la información del usuario
        console.error('Error al obtener la información del usuario: ' + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        //Si no se encuentra ningún usuario con el ID especificado
        callback(null, null);
      } else {
        //Si se encuentra un usuario, devuelve sus datos
        const usuario = result[0]; // Suponiendo que el resultado es un solo usuario
        callback(null, usuario);
      }
    });
  }
}

module.exports = UserRepository;