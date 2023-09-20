class User {
  constructor(id_user, email, name_user, lastName, password, rol) {
    this.id_user = id_user;
    this.email = email;
    this.name_user = name_user;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
  }
}

module.exports = User;