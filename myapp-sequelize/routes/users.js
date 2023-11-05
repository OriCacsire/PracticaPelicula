var express = require('express');
var router = express.Router();

/*requerir el modelo del controlador */
const userController = require ("../controllers/userController")


/*mostrar formulario REGISTER */
router.get('/register', userController.register);

/*Procesa los datos del formulario de REGISTER */
router.post ("/register", userController.store)

/*mostrar formulario LOGIN */
router.get('/login', userController.login);

/*Procesar los datos del formulario de LOGIN */
router.post('/login', userController.loginPost)

module.exports = router;
