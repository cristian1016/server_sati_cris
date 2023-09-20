const mysql = require("mysql2");
const User = require("../models/user");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "conexionTienda",
});

db.connect();

class UserRepository {
  static addUser(user, callback) {
    const {id_user , name_user,lastName, email, password,rol} = user




    const query =
      "INSERT INTO users (id_user,email, name_user, lastName,password,rol) VALUES (?, ?, ?, ? ,? ,?)";
    db.query(query, [id_user,email, name_user, lastName, password,rol], (err, result) => {
      if (err) {
        console.error("Error al registrar el usuario: " + err.message);
        callback(false)
      } else {
        console.log("Usuario registrado con éxito");
        callback(true)
      }
    });
  }


  static obtenerInformacionUsuario(usuarioId, callback) {
    const query = 'SELECT * FROM users WHERE id_user = ?';
    db.query(query, [usuarioId], (err, result) => {
      if (err) {
        console.error('Error al obtener la información del usuario: ' + err.message);
        callback(err, null);
      } else if (result.length === 0) {
        callback(null, null);
      } else {
        const usuario = result[0]; 
        callback(null, usuario);
      }
    });
  }
}

module.exports = UserRepository;