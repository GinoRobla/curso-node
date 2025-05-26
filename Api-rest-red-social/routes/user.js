const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const ckeck = require("../middlewares/auth");

// definir rutas
//AGREGAR VALIDACIONES DE ACCESO 
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getProfile/:id', UserController.getProfile);
router.get('/list/:page', UserController.list);
router.put('/update/:id',  UserController.update);

module.exports = router;