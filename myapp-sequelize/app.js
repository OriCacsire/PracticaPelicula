var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*CREAMOS UNA VARIABLE */
let session = require ("express-session");
//donde usamos nosotros para ejecutar el metodo session --> siempre arriba de las rutas de app.use


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies.js');
//
let db = require("./database/models")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*Ejecuto session */
app.use(session({
  secret:"MyApp",
  resave:false,
  saveUninitialized:true
})); //recibe un objeto literal con la propiedad secreat con un txt aleatorio; resave y saveUnintialized
/* Ejecuto session */

/*PASO LA INFORMACION DE LAS VISTAS */
app.use(function (req,res,next) { 
  //next: se usa para que pase a la siguiente funcionalidad y no se quede cargando 
  if (req.session.user !=undefined) {
    // si el usuario existe entra
    res.locals.user =req.session.user;
    return next();
  }

  return next (); //esto se pone tanto en true como en
})
//CONFIGURACION DE UNA COOKIE
app.use(function(req,res,next){
   if (req.cookies.UserId != undefined && req.session.user == undefined) {
    //preguntamos que: si existe la cookie  (!=undefinded) y no existe el usuario en session.
    let idUsuarioCookie = req.cookies.UserId;

    //para traer datos de la base de datos usamos FindByPK
    db.User.findByPk(idUsuarioCookie) /*ALIAS DE USER -->User*/
    //como es una promesa se usa un then y catch
    .then((user)=>{
      /*Cargamos el usuario encontrado en la session*/
      //permite manejar los datos dentro de lo que es el servidor
      req.session.user = user.dataValue; //es lo que recibo y lo que se tieene en la base de datos.
      
      /*Cargamos el usuario encontrado en locals, se carga en locals porque luego se quiere usar en la vista */
      //permite manejarlos en la vista
      res.locals.user = user.dataValue; 
      return next ();

    })
    .catch((err) => {
      return console.log(err); 
    });
   }else{
    return next();
   }

})

/*PASO LA INFORMACION DE LAS VISTAS */

//prefijos
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; //Si hay algun error, o se pasada una ruta distinta se viene aca y se imprime esto.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
