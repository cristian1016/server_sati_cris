const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

// Función para manejar errores
const handleResponse = (res, message) => {
  return (error, data) => {
    if (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    } else if (!data) {
      res.status(404).json({ message });
    } else {
      res.status(200).json(data);
    }
  };
};

// Registra un usuario
const register = (req, res) => {
  const { id_user, email, name_user, lastName, password, rol} = req.body;

  userRepository.addUser(id_user, email, name_user, lastName, password, rol, (error, valid) => {
    if (valid) {
      res.status(400).json({ status: 'Registro fallido' });
    } else {
      res.status(201).json({ status: 'Registro exitoso' });
    }
  });
};

// Obtiene y devuelve la información del perfil de un usuario
const verPerfilUsuario = (req, res) => {
  const userId = req.query.id_user;

  userRepository.obtenerInformacionUsuario(userId, handleResponse(res, "Usuario no encontrado"), (error, usuario) => {
    if (usuario) {
      const { id_user, name_user, lastName, email, rol } = usuario;
      res.status(200).json({
        message: "Información de perfil obtenida con éxito",
        usuario: { id_user, name_user, lastName, email, rol },
      });
    }
  });
};

module.exports = {
  register,
  verPerfilUsuario
};
