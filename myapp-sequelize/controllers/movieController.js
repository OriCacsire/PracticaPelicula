/* mis modelos*/
const db = require('../database/models');
const movie = db.Movie; // este nombre Movie --> sale directamente del alias
const op = db.Sequelize.Op; //me traigo operadores que estan en modelos index

const indexController = {
    index: function(req, res) {
      
      let filtro = {
        //PROPIEDADES
        // where: [{awards: 1}, {length: 120}],
        // order: [["title", "ASC"]], 
        //  limit: 5, 
        //  offset: 2
      };

      //para poder usar el modulo y filtrar todas las peliculas se usa el metodo findAll este esta dentro de movie

      movie.findAll(filtro)
      .then((result) => {
          return res.render("movies", {listaPeliculas : result});
      }).catch((error) => {
        return res.send(error);
      }); // movie buscame todos los registros que cumplan con este quiterio el que esta dentro de findAll, si no se pone nada, me tiene que traer todo, si traes una promesa me lo guardas en el parametro result, si me traes un error me lo guardas en el parametro error. ¿Que pasa si todo sale bien? Se crea un return res.rendery se renderiza al view movies

    },
    detalle: function(req, res) {
      let idPelicula = req.params.idPelicula;
      //CAMBIO --> antes usabamos un modulo propio entonces podiamos guardarlo en una variable y luego usarlo sin problema, ahora ya no lo tenemos, tenemos un modelo, entonces se lo debe recuperar para luego usarlo
      //Usamos el metodo de sequelize .findByPk() --> y le pasamos el parametro el identificador, q es el id, y esta en idPelicula que es la que se captura con req.params. luego se hace un camino con then, catch y se da la estructura. 
      
      /*implementacion de relaciones*/
      let relacion = {
        // include :[
        //   {association: "genres"}, //alias de relaciones en Movies en la prop as:
        //   {association: "actors"}, //alias de relaciones en Movies. Su tipo de dato es un array que tiene un obj. literal, porqu esta en plurals

        // ]

        include: {
          all: true,
          nested: true
        }
      };

      movie.findByPk(idPelicula, relacion) //funcion asincronica
      .then((result) => {

        // return res.send(result)
        return res.render("detalleMovies", {movie: result});
      })
      .catch((error) => {
        return res.render("error")
      });
     
    },

    new: function (req, res) {
      let filtro = {
        //PROPIEDADES
        order: [["release_date", "DESC"]], 
         limit: 5, 
      };


      movie.findAll(filtro)
      .then((result) => {
          return res.render("movies", {listaPeliculas : result});
      }).catch((error) => {
        return res.send(error);
      }); 
    },
    recommended : function (req, res) {
      let filtro = {
        //PROPIEDADES
        where: [
          {rating:{[op.gte]: 8}}
        ],
        order: [["rating", "DESC"]], 
      };

      movie.findAll(filtro)
      .then((result) => {


          return res.render("movies", {listaPeliculas : result});
      }).catch((error) => {
        return res.send(error);
      });  
    },
    
    busqueda: function(req, res) {
      // capturo el querystring 
      let busqueda = req.query.pelicula;

      // return res.send("el dato que buscas es " + busqueda)

      let filtro = {
        where: [
          // {title: busqueda} */ 
          //PREGUNTA PI: COMO PUEDO FILTRAR CON EL OP DE LIKE
          //La columna titulo queiero que lofiltres por title y le paso otro obj literal --> se nombro al operador como op y se usa la propiedad like y el valor en este caso es busqueda pero como quiero que tenga algo mas a la derecha o izq se le pone un %. 
          // {title: {[op.like]: "%" + busqueda + "%"}}
          {title: {[op.like]: `%${busqueda}%`}}
        ]
      };

      movie.findAll(filtro)
      .then((result) => {
        return res.render("busqueda", {listaPeliculas: result, criterio: busqueda})
      })
      .catch((error) => {
          return res.render("error")
      });
    },

    /*Mostrar formularios de register*/
    showForm:(req,res)=>{

      //Se pone un condicional porque no puede crear un post sin estar antes logeado
      if (req.session.user !=undefined) {
        return res.render("registerMovie")

      } else {
        return res.redirect("/users/login")

      }
    },
    //   /*Registramos una peli --> CREATED */
    store:(req,res)=>{
      let info = req.body; //lo que se requiere de los campos ingresados en el formulario, se usa body porque se da uso al metodo post. 
      // return res.send(info);
      movie
      .create(info)
      .then((result)=>{
        return res.redirect("/movies")
      })
      .catch((error)=>{
        console.log(error);
      })
    },

    // // mostramos form para actualizar
    showFormUpdate:(req,res)=>{
      //como es una ruta parametrizada, apra guardar el parametro el id, primero con el objeto request y la propiedad req.params.id
      let movieId = req.params.id;
      // return res.send({id:movieId})

      movie.findByPk(movieId)  //encuentro la pk, esto tmb es una promesa.Por lo tanto, se debe usar en .then y .catch
      .then((result)=>{
       //se crea un callback y un result.
       console.log(result)
      //  res.send(result) //nos trae todos los datos, dado que ahora estoy con el get. 
      //lo renderizamos y le pasamos el objeto literal --> que se llama movie: result
        res.render("updateMovie",{movie:result})

      })
      .catch((error)=>console.log(error))
     
      
    },
    // // Procesamos el formulario de actualizar
    update:(req,res)=>{
      //recupero el id 
      let id = req.params.id;
      //recupero la informacion que viene del formulario 
      let info=req.body;
        // res.send({id,info})
      
      let criterio ={
        //dentro del critero va el where con un objeto literal, que si hay varios va en un array. El primero id es el nombre de la columna y el otro es lo que se le ingresa
        where:[{
          id:id
        }]
      }

      //metodo update --> primero se le manda la informacion y leugo el critero (el where). 
      movie.update(info,criterio) // es una promesa dado que va a funcionar solo si ingresa algo en esos campos.
      .then((result)=>{
        return res.redirect("/movies/id/"+id);
      })
      .catch(err=>console.log(err))

    },
    // // Creamos el método para borrar la peli
    borrar:(req,res)=>{
      let id = Number(req.params.id);
      let criterio = {
        where:[{id:id}]
      }
    
      movie.destroy(criterio)
      .then((result)=>{
        return res.redirect("/movies")

      })
      .catch((error)=>console.log(error))
    }
}

module.exports = indexController;


/*CUANDO ESTA RELACIONADO CON OTRAS NO SE PUEDE BORRAR SOLO LOS QUE SE CREAN EN EL MOMENTO!!!!!! POR ESO SOLO BORRA LAS PELICULAS QUE SE CREAN */




