const validator = require("validator");

const validate = (params) => {

  let resultado = false;

  if (params.name) {
    let name = !validator.isEmpty(params.name) &&
      validator.isLength(params.name, { min: 3, max: undefined }) &&
      validator.isAlpha(params.name, "es-ES");
    if (!name) throw new Error("Nombre no válido");
  }
  if (params.nick) {
    let nick = !validator.isEmpty(params.nick) &&
      validator.isLength(params.nick, { min: 2, max: 60 });
    if (!nick) throw new Error("Nick no válido");
  }
  if (params.email) {
    let email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
    if (!email) throw new Error("Email no válido");
  }
  if (params.password) {
    let password = !validator.isEmpty(params.password);
    if (!password) throw new Error("Contraseña no válida");
  }
  if (params.surname) {
    let surname = !validator.isEmpty(params.surname) &&
      validator.isLength(params.surname, { min: 3, max: undefined }) &&
      validator.isAlpha(params.surname, "es-ES");
    if (!surname) throw new Error("Apellido no válido");
  }
  resultado = true;

  return resultado;

};


module.exports = validate