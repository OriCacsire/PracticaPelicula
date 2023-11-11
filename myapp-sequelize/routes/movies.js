var express = require('express');
var router = express.Router();

/* requerir el modelo del controlador */
const movieController = require('../controllers/movieController');

/* GET home page. */
router.get('/', movieController.index);

/* GET details movie page. */
router.get('/id/:idPelicula', movieController.detalle);

/* GET ordenar las ultimas 5 */
router.get ('/new', movieController.new)

/*Get recommended  */
router.get ('/recommended', movieController.recommended )

/* GET form -> search page. */
router.get('/busqueda', movieController.busqueda);

/*Mostrar el formulario */
router.get ('/register',movieController.showForm) //hacemos router.get() porque 
/*Procesamos la info y la guardamos */
router.post ('/register',movieController.store )

/*Mostrar el formulario con los datos */
router.get("/editMovie/:id",movieController.showFormUpdate)

/*procesar la modificacion */
router.post("/update/:id",movieController.update)

/*eliminamos un registro */
router.get("/deleteMovie/:id",movieController.borrar)

/* GET form -> search page. */


module.exports = router;